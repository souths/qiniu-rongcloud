const Koa = require('koa')
const qiniu = require('qiniu')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const cors = require('koa2-cors')
app.use(bodyParser())
app.use(cors());
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
    console.log(result);
    user01Token = result
}, error => {
    console.log(error);
});
User.register(user02).then(result => {
    console.log(result);
    user02Token = result

}, error => {
    console.log(error);
});
// var accessKey = 'EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy';
// var secretKey = 'ZB_Opnq9teltd_70kGN19fUGUngS3x9RBh-1l61t';
// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// var options = {
//     scope: 'images',
// };


app.use(async (ctx) => {
    // var putPolicy = new qiniu.rs.PutPolicy(options);
    // var uploadToken = putPolicy.uploadToken(mac); 


    ctx.body = {
        user01:user01Token,
        user02:user02Token
    }

})



app.listen(3000, () => {
    console.log('node应用启动成功')
})