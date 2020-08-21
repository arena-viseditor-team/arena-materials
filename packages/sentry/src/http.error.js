import MSentry from '@arena-materials/sentry'

function install (Http) {
  Http.mixin({
    // 响应失败 或者 400 500 等错误
    $responseReject (error) {
      MSentry.Sentry.captureMessage(error)
      return error
    }
  })
}

export default {
  install
}
