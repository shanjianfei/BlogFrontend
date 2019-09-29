// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createRouter from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import MyPlugins from './plugins/plugins.js'
import createStore from './store/store'
// import { createNamespacedHelpers } from 'vuex'

// @import 'tocbot/src/scss/tocbot-core'
// @import 'tocbot/src/scss/tocbot-default-theme'

Vue.use(ElementUI)
Vue.use(MyPlugins)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.config.productionTip = false

export default function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
