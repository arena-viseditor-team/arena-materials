const request = require('request-promise');
const fs = require("fs");
const _ = require("lodash");
const isRegExp = require('lodash.isregexp');
const debug = require('debug')('arena:sentry');

const DEFAULTCONFIG = {
  baseApi: 'http://arena-sentry.qiwoo.org/api/0',
  include: /\.js$|\.map$/,
  deleteRegex: /\.map$/,
  batch: 5,
  deleteAfterCompile: true,
  createReleaseRequestOptions: {},
  updateFileRequestOptions: {},
  releaseBody: (version, projects) => ({ version, projects }),
  filenameTransform: filename => `~/${filename}`
};

class SentryPlugin {
  constructor(options) {
    this.options = Object.assign({}, DEFAULTCONFIG, options);
  }
  apply(compiler) {
    const pluginName = 'SentryWebpackPlugin';
    compiler.hooks.afterEmit.tapAsync(pluginName, this.sentryAfterEmit.bind(this));
    compiler.hooks.done.tap(pluginName, stats => {
      if (this.options.deleteAfterCompile) {
        this.deleteFiles(stats);
      }
    });
  }

  async sentryAfterEmit(compilation, callback) {
    const errors = this.checkOptions();
    if (errors) {
        return this.handleErrors(errors, compilation, callback);
    }
    const { release, releaseBody, project, filenameTransform } = this.options;
    this.release = release;
    // 处理 创建release 的请求参数
    if (_.isFunction(releaseBody)) {
        this.releaseBody = releaseBody(this.release, [project]);
    }
    // 处理文件变换
    this.filenameTransform = filenameTransform;
    this.filesNames = this.getFileNames(compilation);
    try {
        await this.createRelease();
        await this.uploadFiles();
        callback();
    }
    catch (error) {
        this.handleErrors(error, compilation, callback);
    }
  }
  /**
   *
   * 检查 参数是否合法
   * @private
   * @returns
   * @memberof SentryPlugin
   */
  checkOptions() {
    if (!this.options.organization) {
        return new Error(`organization is required.`);
    }
    if (!this.options.project) {
        return new Error(`project is required.`);
    }
    if (!this.options.token) {
        return new Error(`project is required.`);
    }
    if (!this.options.release) {
        return new Error(`release is required.`);
    }
    return null;
  }

  handleErrors(err, compilation, cb) {
    const errorMsg = `Arena Sentry Plugin: ${err}`;
    if (err.statusCode === 409) {
        compilation.warnings.push(errorMsg);
    }
    else {
        // anne_utils_1.Log.newLine();
        // anne_utils_1.Log.error(`arena-plugin-sentry  ${err}`);
        compilation.errors.push(errorMsg);
    }
    cb();
  }
  /**
   *
   * 获取 需要上传的文件
   * @private
   * @param {*} compilation
   * @returns
   * @memberof SentryPlugin
   */
  getFileNames(compilation) {
    let exclude = isRegExp(this.options.exclude) && this.options.exclude;
    let include = isRegExp(this.options.include) && this.options.include;
    const assets = compilation.assets;
    let filesNames = Object.keys(assets);
    filesNames = filesNames.filter(fileName => {
        let file = assets[fileName] || {};
        // Ignore unemitted files
        if (!file.emitted)
            return false;
        // Check excluced files
        if (exclude && exclude.test(fileName))
            return false;
        // Check included files
        if (include)
            return include.test(fileName);
        return true;
    });
    return filesNames.map(name => {
        return { name, path: assets[name].existsAt };
    });
  }
  /**
   *
   * 创建 新的release
   * @see https://docs.sentry.io/api/releases/post-organization-releases/
   * @private
   * @returns
   * @memberof SentryPlugin
   */
  createRelease() {
    const { token, createReleaseRequestOptions } = this.options;
    const url = `${this.getSentryReleaseApi()}/`;
    const options = {
        url,
        method: 'POST',
        auth: {
            bearer: token
        },
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.releaseBody)
    };
    debug(`create release options`, options);
    return request(Object.assign({}, options, createReleaseRequestOptions || {}));
  }
  /**
   *
   * 获取发送sourcemap 到sentry 的请求地址
   * @private
   * @returns
   * @memberof SentryPlugin
   */
  getSentryReleaseApi() {
    const { baseApi, organization } = this.options;
    const urls = [baseApi];
    // 组织
    urls.push(`organizations/${organization}`);
    // 版本
    urls.push(`releases`);
    return urls.join(`/`);
  }
  /**
   *
   * 上传队列
   * @private
   * @param {*} [err]
   * @returns
   * @memberof SentryPlugin
   */
  execStack(err) {
    const { batch } = this.options;
    if (err) {
        console.log('\n');
        // anne_utils_1.Log.error(`Sentry execStack Error: ${JSON.stringify(err)}`);
        return Promise.reject(err);
    }
    // Get 50 files
    let files = this.filesNames.splice(0, batch);
    if (files.length) {
        return Promise.all(files.map(this.uploadFile.bind(this))).then(() => this.execStack(), this.execStack.bind(this));
    }
    else {
        return Promise.resolve();
    }
  }
  uploadFiles() {
    return this.execStack();
  }
  /**
   *
   * 上传文件
   * @see https://docs.sentry.io/api/releases/post-organization-release-files/
   * @private
   * @param {*} { path, name }
   * @memberof SentryPlugin
   */
  uploadFile({ path, name }) {
    debug(`开始上传..`, name);
    const { token, updateFileRequestOptions } = this.options;
    const url = `${this.getSentryReleaseApi()}/${this.release}/files/`;
    debug(`upload file: ${url}`);
    const options = {
        url,
        method: 'POST',
        auth: {
          bearer: token
        },
        headers: {},
        formData: {
            file: fs.createReadStream(path),
            name: this.filenameTransform(name)
        }
    };
    return request(Object.assign({}, options, updateFileRequestOptions || {}));
  }
  deleteFiles(stats) {
    const assets = stats.compilation.assets;
    Object.keys(assets)
        .filter(name => this.options.deleteRegex.test(name))
        .forEach(name => {
        const { existsAt } = assets[name];
        fs.unlinkSync(existsAt);
    });
  }
}
module.exports = SentryPlugin;
