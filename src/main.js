import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/wyz-echarts/wyz-echarts.js'
import echarts from 'echarts'
import $ from 'jquery'

Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
