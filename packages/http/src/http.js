import Http from './core/instance'
import { initGlobalAPI } from './core/global'
import { initAxios } from './core/axios'

initGlobalAPI(Http)
initAxios(Http)

Http.version = require('../package.json').version

export default Http
