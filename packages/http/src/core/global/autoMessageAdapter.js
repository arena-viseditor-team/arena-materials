import { isUndefined } from 'arena-utils'
/**
 *
 * 自动弹消息适配逻辑
 * 以可以通过 transformResponse 处理成一样的返回值来处理
 * @export
 * @param {*} response
 * @return {boolbean} 返回true 代表需要谈消息适配成功
 */
export function autoMessageAdapter (response) {
  const { data: { code } } = response
  // 非 code 返回值 请使用 transformResponse 处理 如果不处理 isAutoMsg 失效
  if (isUndefined(code)) {
    return false
  }
  if (code !== 0) {
    return true
  }
  return false
}
