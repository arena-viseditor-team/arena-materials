import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

export default {
  install (Vue, sentryConfig) {
    Sentry.init({
      release: process.env.VUE_APP_RELEASE,
      enabled: Object.is(process.env.NODE_ENV, 'production'),
      environment: process.env.NODE_ENV,
      integrations: [new VueIntegration({ Vue, attachProps: true })],
      ...sentryConfig
    })

    Vue.sentry = Sentry
    Vue.mixin({
      created () {
        this.$sentry = Sentry
      }
    })
  },
  Sentry
}
