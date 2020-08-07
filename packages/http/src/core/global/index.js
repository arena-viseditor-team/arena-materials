import { toArray } from '../util'
import { initMixin } from './mixin'
import { message } from './message'
import { loading } from './loading'
import { autoMessageAdapter } from './autoMessageAdapter'

export function initGlobalAPI (Http) {
  Http.use = function (plugin) {
    const installedPlugins = (this.installedPlugins || (this.installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }

  Http.options = Object.create(null)
  Http.options.$message = message
  Http.options.$loading = loading
  Http.options.$autoMessageAdapter = autoMessageAdapter

  initMixin(Http)
}
