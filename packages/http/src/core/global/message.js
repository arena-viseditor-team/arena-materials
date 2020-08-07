/**
 *
 * 自动提示消息 适配器
 * @export
 * @param {*} response  isReject 为true 时 值是 config.errorMsg 对象 否则是响应对象
 * @param {*} isReject 是resolve 状态 还是reject 状态 400  500 会走 reject 状态
 * @param { Object } origin 包含了本次请求的所有原始数据 { request, response, config }
 */
// eslint-disable-next-line
export function message (response, isReject = false, origin = {}) {
  if (isReject) {
    // 这里的 response 必须 创建一个新的对象 不然会导致 notify 引用的是同一个实例出现无法关闭的Bug
    // ac && ac.$notify.error(Object.assign({}, response))
    return
  }
  const { data } = response
  // ac && ac.$notify.error({
  //   title: '操作提示',
  //   message: data.message
  // })
}
