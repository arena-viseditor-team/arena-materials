/**
 *
 * loading 适配器
 * @export
 * @param {*} loadingConfig
 * @returns
 */
export function loading (loadingConfig) {
  return window.ac && window.ac.$loading(loadingConfig)
}
