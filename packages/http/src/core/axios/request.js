import { isFunction, isUndefined } from 'arena-utils'

function resolve ({ options, value }) {
  const { Http, LOADING } = options
  const { $requestResolve, $loading } = Http.options
  // 未考虑 是promise 的情况
  const config = isFunction($requestResolve) ? $requestResolve(value) : value
  // 自动loading
  if (config.isLoading) {
    LOADING.loadings.push(config.url)
    if (!LOADING.isLoading) {
      const loadingConfig = config.loadingConfig
      if (isUndefined(loadingConfig.target)) {
        delete loadingConfig.target
      }
      LOADING.$loading = $loading(config.loadingConfig)
    }
  }
  return config
}

function reject ({ options, value }) {
  const { $requestReject } = options.Http.options
  if (isFunction($requestReject)) {
    return $requestReject(value)
  }
  return Promise.reject(value)
}

export default [resolve, reject]
