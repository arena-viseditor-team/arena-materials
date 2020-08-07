import {hasClass} from './has.class'

/**
 *
 * removeClass
 * @export
 * @param {HTMLElement} el
 * @param {string} cls
 */
export function removeClass(el, cls) {
  if (hasClass(el, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}
