'use strict';

const Controller = require('egg').Controller

class UserController extends Controller{
  async index (){
    this.ctx.body = {
      'user':'post'
    }
  }
}

module.exports = UserController

// 前端请求
//let data = await axios.post('http://127.0.0.1:7001/user/index')