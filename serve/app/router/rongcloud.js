module.exports = app =>{
  const {router,controller} = app
  router.get('/rongcloud/token',controller.rongcloud.token.token)

}