'use strict';
//替换成您自己的 Appkey
var appkey = 'pwe86ga5p9gq6';
// 替换成您自己的 Secret
var secret = 'UvQ3OyoAph';

var RongSDK = require('rongcloud-sdk')({
  appkey: appkey,
  secret: secret
});
var User = RongSDK.User;
var user01 = {
  id: '01',
  name: '01',
  portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
};
var user01Token = {}
var user02 = {
  id: '02',
  name: '02',
  portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
};
var user02Token = {}
User.register(user01).then(result => {
  user01Token = result
}, error => {
  console.log(error);
});
User.register(user02).then(result => {
  user02Token = result

}, error => {
  console.log(error);
});
const Controller = require('egg').Controller

class TokenController extends Controller {
  async token() {
    this.ctx.body = {
      user01: user01Token,
      user02: user02Token
    }
  }
}

module.exports = TokenController

//前端请求
// let data2 = await axios.get('http://127.0.0.1:7001/rongcloud/token')