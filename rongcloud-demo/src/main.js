// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filter from './filter'
import axios from 'axios'
import qiniuUp from './common/js/qiniuUp'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(qiniuUp)
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
