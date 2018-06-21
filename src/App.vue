<template>
  <div id="app">
    <h2>上传之前先
      <a class='link' href='http://jssdk.demo.qiniu.io/uptoken'>点击我</a>获取最新token把Qiniu.uploader({uptoken: 'xxx'})替换下</h2>
    <span id='pickfiles' class="pickfiles">上传按钮</span>
    <div class="progress">{{progress}}</div>
    <button @click="qx">取消上传</button>

    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    resolve
  } from 'url';
  import {
    RSA_PKCS1_PADDING
  } from 'constants';
  import {
    setTimeout
  } from 'timers';
  export default {
    name: 'App',
    data() {
      return {
        progress: '',
        qiniuUPtoken: '',
        stop:''
      }
    },
    created() {},
    mounted() {
      this.gettoken()
      this.initQiniu()
    },
    methods: {
      qx(){
        console.log(this.stop);
        
          this.stop.removeFile('pickfiles')
          
      },
      async gettoken() {
        let {
          data
        } = await axios.get('http://localhost:3000/')
        this.qiniuUPtoken = data.uptoken

      },
      initQiniu() {
        setTimeout(() => {
          /* eslint-disable */
       this.stop = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.1/Moxie.swf',
            chunk_size: '4mb',
            // uptoken: 'EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy:355JkDkHX9Jf0XdzM8optu68E1g=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTI5NTkyNTg2fQ==',
            // uptoken_url: 'http://jssdk.demo.qiniu.io/uptoken',
            uptoken: this.qiniuUPtoken,
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
