import { initMixin } from './init'

function Http (options) {
  this.init(options)
}

initMixin(Http)

export default Http
