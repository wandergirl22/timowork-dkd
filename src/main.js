import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 注册自定义指令
<<<<<<< HEAD
import * as directives from '@/directives'
import 'echarts'
import Echarts from 'vue-echarts'
import dayjs from 'dayjs'
=======
import * as directives from "@/directives";

// 注册自定义组件
import zzlUI from '@/components/index'
Vue.use(zzlUI)

>>>>>>> 1d538000e19ca7e0f84ddfb1bc571326ae15f2e0
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
dayjs.locale('zh-cn')
Vue.component('v-chart', Echarts)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 注册自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
