const Koa = require('koa')
const qiniu = require('qiniu')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const cors = require('koa2-cors')
app.use(bodyParser())
app.use(cors());
var accessKey = 'EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy';
var secretKey = 'ZB_Opnq9teltd_70kGN19fUGUngS3x9RBh-1l61t';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: 'images',
};


app.use(async (ctx) => {
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);    
    ctx.body = {
        "uptoken": uploadToken,
        }

})



app.listen(3000, () => {
    console.log('node应用启动成功')
})