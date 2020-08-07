export function initMixin (Http) {
  Http.mixin = function (mixin) {
    this.options = Object.assign({}, this.options, mixin)
    return this
  }
}
