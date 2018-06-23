import * as qiniu from "qiniu-js";
import axios from 'axios'
function install(Vue) {
  let token = ''
  //获取token
  axios.get('http://localhost:3000/').then((data) => {
    
      console.log('七牛云token获取成功')
      token = data.data.uptoken
    
  }).catch((err) => {
    console.log('七牛云token获取失败,请查看qiniuUp.js文件')
  })
  //添加到Vue原型上的方法
  Vue.prototype.qiniuUp = function (file) {
    let _this = this
    let key = file.name
    //错误信息
    var error = function (err) {
      _this.$bus.$emit('qiniuUpError', err)
    };
    //完成后的操作
    var complete = function (res) {
      _this.$bus.$emit('qiniuUpComplete', res)
    };
    //进度信息
    var next = function (response) {
      _this.$bus.$emit('qiniuUpNext', response)
    };
    var subObject = {
      next: next,
      error: error,
      complete: complete
    };
    var putExtra = {
      fname: "",
      params: {},
      mimeType: null
    };
    var config = {
      useCdnDomain: false,
      region: null
    };
    //后端取到七牛云的token，然后前端通过后端定义的接口拿到七牛云的token
    let observable = qiniu.upload(file, key, token, putExtra, config);
    let subscription = observable.subscribe(subObject);
    //通过$emit $on来取消上传
    this.$bus.$on('unsubscribe',function(){
        subscription.unsubscribe()
    })
  }

  //不使用vuex的情况下，非父子组件增加全局的Event bus,使得$on,$emit可以使用
  const EventBus = new Vue() //Eventbus
  //添加到全局的 Vue 对象
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get: function () {
        return EventBus
      }
    }
  })
}
export default install
