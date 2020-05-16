
module.exports = app =>{
  const {router,controller} = app
  router.get('/qiniu/token',controller.qiniu.token.token)
}