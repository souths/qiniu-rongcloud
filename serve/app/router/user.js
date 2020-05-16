module.exports = app =>{
  const {router,controller} = app
  router.post('/user/index',controller.user.index.index)

}