<template>
  <div id="app">
    <h1>以下是使用七牛云js-sdk1.x上传方法</h1>    
    <h2>上传之前先
      <a class='link' href='http://jssdk.demo.qiniu.io/uptoken'>点击我</a>获取最新token把Qiniu.uploader({uptoken: 'xxx'})替换下</h2>
    <span id='pickfiles' class="pickfiles">上传按钮</span>
    <div class="progress">{{progress}}</div>
    <button @click="qx">取消上传</button>
   
    <hr>
    <h1>以下是使用七牛云js-sdk2.x上传方法</h1>
    <!-- 分割线 -->
    <div style="width:120px;height:120px;position:relative;margin:0 auto;">
      <span style="width:100%;height:100%;position:absolute;top:0;left:0;" class="pickfiles">上传按钮</span>
      <input class="file-input" type="file" id="select2" @change="fil" ref="referenceUpload" style="display:block;position:absolute;width:100%;height:100%;top:0;left:0;z-index:1000;opacity:0">
    </div>
    <hr style="margin-top:50px">
    <h1>以下是对七牛云js-sdk封装冲vue的插件使用，具体看common/js/qiniuUp.js</h1>
     <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as qiniu from 'qiniu-js' //七牛云js-sdk2.x版本
  export default {
    name: 'App',
    data() {
      return {
        progress: '',
        qiniuUPtoken: '',
        stop: ''
      }
    },
    created() {},
    mounted() {
      this.gettoken()
      this.initQiniu()
    },
    methods: {
      qx() {
        console.log(this.stop);
        this.stop.removeFile('pickfiles')
      },
      async gettoken() {
        let {
          data
        } = await axios.get('http://localhost:3000/')
        this.qiniuUPtoken = data.uptoken
      },
      //七牛云js-sdk1.x版本的使用方法
      /*js-sdk1.x版本的使用需要plupload/2.1.1和qiniu.js,并且qiniu.js需要下载放到static目录下,在main.js中导入
      因为从后端获取七牛云的token是异步的，所以需要使用setTimeout延迟加载Qiniu.uploader
      */
      initQiniu() {
        setTimeout(() => {
          /* eslint-disable */
          Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.1/Moxie.swf',
            chunk_size: '4mb',
            uptoken: 'EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy:UyOCah90Rb28mV866BWSm1i_Qi0=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTI5NjM1Mjg3fQ==',
            // uptoken_url: 'http://jssdk.demo.qiniu.io/uptoken',
            // uptoken: this.qiniuUPtoken,
            domain: 'http://qiniu-plupload.qiniudn.com/',
            get_new_uptoken: false,
            auto_start: true,
            max_retries: 3,
            filters: {
              max_file_size: '10000mb',
              prevent_duplicates: false
              // Specify what files to browse for
              // mime_types: [
              //     {title : 'apk files', extensions : 'apk'} // 限定apk后缀上传格式上传
              // ]
            },
            init: {
              'FilesAdded': (up, files) => {
                console.log('文件就绪', files);
              },
              BeforeUpload: (up, file) => {
                console.log('上传之前', file);
              },
              UploadProgress: (up, file) => {
                console.log('上传中 file', file);
                this.progress = file.percent + '%';
              },
              FileUploaded: (up, file, info) => {
                console.log(up, '文件上传完毕')
                console.log(file, '文件上传完毕')
                console.log(info, '文件上传完毕')
              },
              Error: (up, err, errTip) => {
                console.log('上传失败', err);
              },
              Key: (up, file) => {}
            }
          });
        }, 1000)



      },
      // 分割线 js-sdk2.x版本使用方法
      /**
       * js-sdk2.x版本使用，此处是通过h5的input type=“file”来上传，只需要npm install qiniu-js --save
       * 然后在需要的vue页面 import * as qiniu from 'qiniu-js'
       */
      fil() {
        //拿到文件的信息
        let file = this.$refs.referenceUpload.files[0]
        // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
        var error = function (err) {
          console.log(err, 'complete');

        };

        var complete = function (res) {
          console.log(res, 'complete');

        };

        var next = function (response) {
          console.log(response, 'next');

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
          region: null,
        };
        //后端取到七牛云的token，然后前端通过后端定义的接口拿到七牛云的token
        var token = this.qiniuUPtoken
        var key = file.name;
        let observable = qiniu.upload(file, key, token, putExtra, config);
        let subscription = observable.subscribe(subObject);
      }
    }

  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .pickfiles {
    padding: 10px;
    background: #000;
    border-radius: 5px;
    color: #fff;
  }

  .link {
    color: red;
  }

  .progress {
    color: red;
    font-size: 30px;
    margin-top: 20px;
  }

</style>