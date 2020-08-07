/**
 *
 * 判断css 是否存在
 * @export
 * @param {HTMLElement} el
 * @param {string} cls
 * @returns
 */
export function hasClass(el, cls) {
  return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(el.className)
}
