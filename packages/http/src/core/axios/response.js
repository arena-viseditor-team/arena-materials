import { isFunction } from '@arena-materials/utils'

async function resolve ({ options, value }) {
  const { Http, LOADING, transformResponse } = options
  const { $responseResolve, $message, $autoMessageAdapter } = Http.options
  const { config } = value
  // 先处理 loading
  if (config.isLoading) {
    const index = LOADING.loadings.indexOf(config.url)
    LOADING.loadings.splice(index, 1)
    if (LOADING.$loading && LOADING.loadings.length === 0) {
      LOADING.$loading.close()
      LOADING.$loading = null
      LOADING.isLoading = false
    }
  }

  let response = null
  try {
    response = isFunction($responseResolve) ? await $responseResolve(value) : value
    const isAutoMessage = $autoMessageAdapter(response)
    if (!isAutoMessage) {
      return transformResponse(response.data)
    }
    // 是否自动提示消息
    if (config.isAutoMsg) {
      $message(response, false, value)
    }
    return Promise.reject(response.data)
  } catch (error) {
    // 如果本身就返回错误 直接 reject 回去
    return Promise.reject(error)
  }
}

async function reject ({ options, value }) {
  const { Http, LOADING, errorMsg } = options
  LOADING.loadings = []
  if (LOADING.$loading) {
    LOADING.$loading.close()
    LOADING.$loading = null
  }
  LOADING.isLoading = false

  const { $responseReject, $message } = Http.options
  let error = null
  try {
    error = isFunction($responseReject) ? await $responseReject(value) : value
    if (errorMsg) {
      $message(errorMsg, true, value)
    }
    return Promise.reject(error)
  } catch (err) {
    return Promise.reject(err)
  }
}

export default [resolve, reject]
