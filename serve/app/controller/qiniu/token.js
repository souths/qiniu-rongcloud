'use strict';
const qiniu = require('qiniu')
var accessKey = 'EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy';
var secretKey = 'ZB_Opnq9teltd_70kGN19fUGUngS3x9RBh-1l61t';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: 'images',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac); 


const Controller = require('egg').Controller

class TokenController extends Controller{
  async token (){
    this.ctx.body = {token:uploadToken}
  }
}

module.exports = TokenController

//前端请求
//let data1 = await axios.get('http://127.0.0.1:7001/qiniu/token')