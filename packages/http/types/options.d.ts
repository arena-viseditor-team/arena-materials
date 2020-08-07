import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ErrorMsg {
  /**
   *
   *  消息title
   * @type {string}
   * @memberof ErrorMsg
   */
  title?: string;
  /**
   *
   * 消息内容
   * @type {string}
   * @memberof ErrorMsg
   */
  message?: string;
  [key: string]: any;
}

export interface LoadingConfig {
  /**
   *
   * 文本
   * @type {string}
   * @memberof LoadingConfig
   */
  text?: string;
  /**
   *
   * Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；
   * 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点默认是 document.body
   * @type {undefined}
   * @memberof LoadingConfig
   */
  target?: undefined;
  [key: string]: any;
}

export interface RcHttpRequestConfig extends AxiosRequestConfig {
  /**
   *
   * 是否自动处理 弹框消息 默认是true
   * @type {boolean}
   * @memberof RcHttpRequestConfig
   */
  isAutoMsg?: boolean;
  /**
   *
   * 自动loading 默认是true
   * @type {boolean}
   * @memberof RcHttpRequestConfig
   */
  isLoading?: boolean;
  /**
   *
   * loading 配置
   * @type {LoadingConfig}
   * @memberof RcHttpRequestConfig
   */
  loadingConfig?: LoadingConfig;
  /**
   *
   * 如果参数是空值是不传 默认是 false
   * @memberof RcHttpRequestConfig
   */
  isRemoveField? boolean;
  /**
   *
   * 和 isRemoveField 一起使用 需要移除的列
   * @type {string[]}
   * @memberof RcHttpRequestConfig
   */
  removeField?: string[];
  [key: string]: any;
}

export interface RcHttpOptions {
  /**
   *
   * 请求前缀 默认是 /api
   * @type {string}
   * @memberof Options
   */
  baseURL?: string;
  /**
   *
   * axios 配置
   * @see https://github.com/axios/axios
   * @type {AxiosRequestConfig}
   * @memberof Options
   */
  axios?: AxiosRequestConfig;
  /**
   *
   * 默认错误提示消息 400 500 走的默认提示 如果没有或者 undefined 则不提示
   * @type {ErrorMsg}
   * @memberof Options
   */
  errorMsg?: ErrorMsg;
  /**
   *
   * 请求配置
   * @type {RcHttpRequestConfig}
   * @memberof Options
   */
  requestConfig?: RcHttpRequestConfig;
  [key: string]: any;
}

export interface MixinsOptions {
  /**
   *
   * 自动弹消息 弹框适配器 会覆盖原有 适配器
   * @template T
   * @template R
   * @param {(ErrorMsg | R)} response
   * @param {(boolean | undefined)} [isReject]
   * @memberof InterceptorOptions
   */
  $message?(response: ErrorMsg | AxiosResponse, isReject?: boolean | undefined): void;
  /**
   *
   * 请求成功 resolve 适配器
   * @param {RcHttpRequestConfig} [config]
   * @memberof InterceptorOptions
   */
  $requestResolve?(config?: RcHttpRequestConfig): any;;
  /**
   *
   * 请求失败 reject 适配器
   * @param {*} [error]
   * @memberof InterceptorOptions
   */
  $requestReject?(error?: any): any;;
  /**
   *
   * 响应成功 钩子
   * @param {(AxiosResponse | AxiosPromise)} [response]
   * @memberof InterceptorOptions
   */
  $responseResolve?(response?: AxiosResponse | AxiosPromise): any;
  /**
   *
   * 响应失败 钩子
   * @param {*} [error]
   * @memberof InterceptorOptions
   */
  $responseReject?(error?: any): any;
  /**
   *
   * 自动loading loading 适配器
   * @param {LoadingConfig} [loadingConfig]
   * @memberof InterceptorOptions
   */
  $loading?(loadingConfig?: LoadingConfig): any;
  /**
   *
   * 自动消息 判断条件适配器
   * @memberof InterceptorOptions
   */
  $autoMessageAdapter?(response?: AxiosResponse | AxiosPromise): boolean;
}