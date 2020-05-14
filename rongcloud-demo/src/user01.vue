<template>
  <div>01</div>
</template>

<script>
import axios from "axios";
import * as qiniu from "qiniu-js"; //七牛云js-sdk2.x版本
export default {
  props: {
    user: {}
  },
  name: "user01",
  data() {
    return {
      qiniuUPtoken: "",
      im: ""
    };
  },
  created() {
    this.im = RongIMLib.init({
      appkey: "pwe86ga5p9gq6"
    });
    var conversationList = []; // 当前已存在的会话列表
    this.im.watch({
      conversation: function(event) {
        var updatedConversationList = event.updatedConversationList; // 更新的会话列表
        console.log("001==更新会话汇总:", updatedConversationList);
        console.log(
          "01==最新会话列表:",
          im.Conversation.merge({
            conversationList,
            updatedConversationList
          })
        );
      },
      message: function(event) {
        var message = event.message;
        console.log("01==收到新消息:", message);
      },
      status: function(event) {
        var status = event.status;
        console.log("01==连接状态码:", status);
      }
    });
  },
  mounted() {
          /* 开发者后台获取或 Server API */
    //       this.im.disconnect().then(function() {
    //   console.log('断开链接成功');
    // });
  },
  methods: {
    connect(params) {

      var user = {
        token:params.token
      };
      this.im.connect(user)
        .then(function(user) {
          console.log("01==链接成功, 链接用户 id 为: ", user.id);
        })
        .catch(function(error) {
          console.log("01==链接失败: ", error.code, error.msg);
        });
    }
  },
  watch:{
    user(o,v){
      this.connect(o)
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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