import AxiosConfig from './axios.config'
import { getParams } from './utils'

export function initAxios (Http) {
  Http.prototype.initAxios = function () {
    if (this.$fetch) {
      return
    }
    this.$fetch = AxiosConfig(this.options, Http)
  }

  /**
   * get 请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.get = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()
    opts.params = getParams(params, opts)
    return this.$fetch.get(url, opts)
  }

  /**
   *
   * post 提交
   * @param {String} url 请求的url
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.post = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()
    return this.$fetch.post(url, getParams(params, opts), opts)
  }

  /**
   *
   * put 提交
   * @param {String} url 请求的url
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.put = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()
    return this.$fetch.put(url, getParams(params, opts), opts)
  }

  /**
   *
   * delete 提交
   * @param {String} url 请求的url
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.delete = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()
    opts.params = getParams(params, opts)
    return this.$fetch.delete(url, opts)
  }

  /**
   *
   * patch 提交
   * @param {String} url 请求的url
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.patch = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()
    return this.$fetch.patch(url, getParams(params, opts), opts)
  }

  /**
   *
   * 下载
   * {String} url 请求的url
   * {Object} params 请求的参数
   * {string} type 请求的类型 模式是 post
   * {Object} 请求配置 如果 baseURL 是undefined 则不添加前缀
   */
  Http.prototype.download = function (url, params = {}, type = 'post', config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    const $form = document.createElement('form')
    $form.setAttribute('method', type)
    $form.setAttribute('hidden', 'hidden')
    $form.setAttribute('action', getUrl(url, opts.isApiHost))

    const createInput = (name, value) => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', name)
      input.setAttribute('value', value)

      $form.appendChild(input)
    }

    Object.keys(params).forEach(key => {
      createInput(key, params[key])
    })

    const $body = document.body || document.getElementsByTagName('body')[0]
    $body.append($form)
    $form.submit()
    $form.remove()
  }

  /**
   *
   * 上传
   * @param {String} url 请求的url
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.upload = function (url, params = {}, config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    this.initAxios()

    const form = new FormData()
    Object.keys(getParams(params, opts)).forEach(key => {
      form.append(key, params[key])
    })
    return this.$fetch.post(url, form, opts)
  }

  /**
   *
   * request 提交
   * @param {object} config 请求配置
   * @returns Promise
   */
  Http.prototype.request = function (config = {}) {
    const requestConfig = this.options.requestConfig || {}
    const opts = { ...requestConfig, ...config }
    return this.$fetch.request(opts)
  }
}

/**
 *
 * url 处理如果 baseURL 是空 则不处理
 * @param {any} url
 * @param {any} baseURL
 * @returns
 *
 */
function getUrl (url, baseURL) {
  if (!baseURL) {
    return url
  }
  const arr = [baseURL]
  arr.push(url)
  return arr.join('')
}
