// 注册自定义指令
// import '@/libs/directive'
// import '@/libs/filter'
import dayjs from 'dayjs'
import { get } from 'lodash'
// 自定义图标需要放在element后面引入,否则会被覆盖
// import '@/assets/iconfont-szyd/style.css'
import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import i18n from './plugins/i18n'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== 'production' // 开启vue-devtools调试工具
Vue.config.performance = process.env.NODE_ENV !== 'production'

Vue.prototype.$dayjs = dayjs
Vue.prototype.$get = get

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

i18n.locale = process.env.VUE_APP_I18N_LOCALE || 'zh-CN'
