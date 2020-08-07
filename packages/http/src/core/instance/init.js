import Config from './config'
export function initMixin (Http) {
  Http.prototype.init = function (options) {
    const vm = this
    vm.options = Object.assign({}, Config, options)
  }
}
