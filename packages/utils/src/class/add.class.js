import {hasClass} from './has.class'

/**
 *
 * 添加class
 * @export
 * @param {HTMLElement} el
 * @param {string} cls
 */
export function addClass(el, cls) {
  if (!hasClass(el, cls)) {
    el.className += ' ' + cls
  }
}
