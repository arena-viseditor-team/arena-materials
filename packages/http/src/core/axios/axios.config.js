import axios from 'axios'
import request from './request'
import response from './response'

const LOADING = {
  // 存储执行 loading 的请求队列
  loadings: [],
  // 是否正在加载 loading
  isLoading: false,
  // loading 加载实例 用于清除loading
  $loading: null
}

// 请求适配器
const [requestResolve, requestReject] = request
// 响应适配器
const [responseResolve, responseReject] = response

export default function AxiosConfig (config, Http) {
  // 请求前缀
  if (config.baseURL) {
    config.axios.baseURL = config.baseURL
  }
  const service = axios.create(config.axios || {})
  const options = {
    LOADING,
    ...config,
    Http
  }

  service.interceptors.request.use((requestConfig) => {
    return requestResolve.call(this, {
      options,
      value: requestConfig
    })
  }, (error) => {
    return requestReject.call(this, {
      options,
      value: error
    })
  })

  service.interceptors.response.use(res => {
    return responseResolve.call(this, {
      options,
      value: res
    })
  }, error => {
    return responseReject.call(this, {
      options,
      value: error
    })
  })

  return service
}
