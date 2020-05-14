<template>
  <div>
    <div>视频上传</div>
    <el-container>
      <el-header>
        <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
        <div>
          <span class="pro">当前上传速度：{{progress}}MB/s</span>
          <span class="pro">剩余时间：5分钟</span>
          <span class="pro">已上传：{{loaded}}MB/{{total}}MB</span>
          <el-button type="primary" class="cancel-btn" @click="unsubscribe">取消上传</el-button>
        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-form ref="video" :model="videos" label-width="100px">
            <el-col :span="10">
              <el-form-item label="视频标题">
                <div class="elFormItem">
                  <el-input v-model="videos.title" placeholder="请填写视频标题"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="视频分类">
                <div class="elFormItem">
                  <el-select v-model="videos.type" placeholder="请选择视频分类">
                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in types" :key="index"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="隐私设置">
                <div class="elFormItem">
                  <el-input v-model="videos.privacy" placeholder="请填写隐私设置"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="视频标签">
                <div class="elFormItem">
                  <el-input v-model="videos.tag" placeholder="请填写视频标签"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="视频简介">
                  <div>
                    <el-input type="textarea" autosize placeholder="请填写视频简介" v-model="videos.About">
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="视频封面">
                  <span class="check">
                    <el-checkbox v-model="videos.checked">自动截取影片画面</el-checkbox>
                  </span>
                  <div class="images">
                  </div>
                </el-form-item>
                <el-form-item label="视频上传">
                  <div class="addvideo">
                    <span class="pickfiles">添加视频</span>
                    <input class="file-input" accept="video/*" :disabled="fileDisabled" type="file" id="select2" @change="fileVideo" ref="referenceUpload">

                  </div>
                  <span>{{fileName}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-form>

        </el-row>
      </el-main>
      <el-footer>
        <div class="foot">
          <el-button type="primary">保存发布</el-button>
          <el-button type="primary" @click="goback">返回</el-button>

        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "addvideo",
    data() {
      return {
        videos: {
          title: "", //标题
          type: 1, //分类
          privacy: "", //隐私
          tag: "", //标签
          About: "", //简介
          picture: "", //封面
          checked: false, //自动截取影片画面
        },
        types: [],
        percentage: 0, //上传进度,
        loaded: 0, //已上传
        total: 0, //总文件大小
        size: 0,
        progress: '0', //上传速度
        fileName: '', //文件名称
        fileDisabled: false,
        fileInfo: {
          hash: '', //上传成功七牛云返回的hash
          key: '', //上传成功七牛云返回的key->资源名称
        }
      };
    },
    created() {
      this.$bus.$on('qiniuUpNext', this.qiniunext)
      this.$bus.$on('qiniuUpComplete', this.qiniucomplete)
      this.$bus.$on('qiniuUpError', this.qiniunerror)
    },
    mounted() {
    },
    methods: {
      goback() {

        //   console.log(this.total,this.size);

      },

      //input标签
      async fileVideo() {
        //拿到文件的信息
        let file = this.$refs.referenceUpload.files[0];
        if (file) {
          this.fileDisabled = true
          this.fileName = file.name
          //调用挂载到Vue原型上的方法
          this.qiniuUp(file)
        }


      },
      //取消上传
      unsubscribe() {
        this.$bus.$emit('unsubscribe')
      },
      //七牛上传进度信息
      qiniunext(res) {
        let mb = 1024 * 1024
        this.percentage = Number(res.total.percent.toFixed(2)) //上传进度
        this.loaded = parseInt(res.total.loaded / mb)
        this.total = parseInt(res.total.size / mb)
        this.size = res.total.size
      },
      //七牛上传完成信息
      qiniucomplete(res) {
        if (res) {
          this.fileInfo = Object.assign(this.fileInfo, res)
          this.$message.success('上传成功')
           this.fileDisabled = false
        }
      },
      //七牛上传错误信息
      qiniunerror(err) {
        this.$message.err(err.message)
          this.fileDisabled = false
      }
    },
    components: {
      
    }
  };

</script>

<style scoped >
  .progress {
    margin-top: 20px;
  }

  .pro {
    margin-left: 30px;
  }

  .cancel-btn {
    margin-left: 200px;
  }

  .elFormItem {
    width: 250px;
    .el-select {
      width: 100%;
    }
  }

  .el-form-item__content {
    position: relative;
  }

  .check {
    // position: absolute;
    //    top: 20px;
    // left: -110px;
    font-size: 12px;
  }

  .addvideo {
    width: 120px;
    height: 40px;
    position: relative;
  }

  .pickfiles {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }

  .file-input {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
  }

  .foot {
    display: flex;
    justify-content: center;
    align-items: center
  }

</style>