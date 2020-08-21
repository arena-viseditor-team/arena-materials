# Sentry

> @arena-materials/sentry for arena

## 安装

```shell
yarn add @arena-materials/sentry -S
```

## 使用

::: tip
  `release` 配置以自动配置 无需手动在配置
:::

> 运行环境依赖与 Anne CLI  `anne-plugin-sentry`

```js
import Sentry from '@arena-materials/sentry'

Vue.use(Sentry, {
  dsn: 'you dsn'
})
```

### Vue 中使用

```html
<template>
  // TODO
</template>
<script>
  export default {
    methods: {
      onClick () {
        // Set user information, as well as tags and further extras
        this.$sentry.configureScope(scope => {
          scope.setExtra('battery', 0.7)
          scope.setTag('user_mode', 'admin')
          scope.setUser({ id: '4711' })
          // scope.clear();
        })


        // Add a breadcrumb for future events
        this.$sentry.addBreadcrumb({
          message: 'My Breadcrumb',
          // ...
        })

        // Capture exceptions, messages or manual events
        this.$sentry.captureMessage('Hello, world!')
        this.$sentry.captureException(new Error('Good bye'))
        this.$sentry.captureEvent({
          message: 'Manual',
          stacktrace: [
            // ...
          ],
        })
      }
    }
  }
</script>
```

### JS 中使用

#### 原型链

```js
import Vue from 'vue'

Vue.sentry.captureMessage('Hello, world!')
Vue.sentry.captureException(new Error('Good bye'))
// TODO more api ...

```

#### 直接调用

```js
import MSentry from '@arena-materials/sentry'

MSentry.Sentry.captureMessage('Hello, world!')
MSentry.Sentry.captureException(new Error('Good bye'))
```

### 捕获 Http 错误

> 这里只针对 使用 我们提供的模板生成的项目
> `src/base/http.base.js`  新增 HttpError

```diff
import Http from '@arena-materials/http'
import HttpConfig from '@/config/http.config'
+ import HttpError from '@arena-materials/sentry/src/http.error'

Http.use(HttpConfig)
+ Http.use(HttpError)

const http = new Http({
  baseURL: '/api'
})

export default http
```

## API 文档

@see [http://getsentry.github.io/sentry-javascript/modules/browser.html](http://getsentry.github.io/sentry-javascript/modules/browser.html)
