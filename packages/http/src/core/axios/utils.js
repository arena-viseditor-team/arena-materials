/**
 *
 * 处理参数 移除值是 空的 和加上一些用户信息等操作
 * @param {any} params 传入参数
 * @param {any} config 配置
 * @returns 返回新的参数
 */
export function getParams (params, config) {
  // 用户相关
  if (!config.isRemoveField) {
    return params
  }
  return removeEmptyField(params, config.removeField)
}

/**
 *
 * 移除提交请求中 列为空 null undefined 的值
 * @param {any} [params={}] 传入的参数
 * @param {any} [removeField=[]] 需要移除的列
 */
export function removeEmptyField (params = {}, removeField = []) {
  const copyParams = JSON.parse(JSON.stringify(params))
  let arrField = removeField
  if (removeField.length === 0) {
    arrField = Object.keys(params)
  }
  arrField.forEach(key => {
    const val = copyParams[key]
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key]
    }
  })
  return copyParams
}
