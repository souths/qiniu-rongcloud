// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filter from './filter'
import axios from 'axios'
Vue.config.productionTip = false
Object.keys(filter).forEach((key)=>{
  Vue.filter(key,filter[key])
})
import '../static/qiniu.js'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
