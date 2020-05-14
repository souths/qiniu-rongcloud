<template>
  <div id="app">
    <!-- <user01 :user="qiniuUPtoken.user01" /> -->
    <user02 :user="qiniuUPtoken.user02" />
  </div>
</template>

<script>
import axios from "axios";
import * as qiniu from "qiniu-js"; //七牛云js-sdk2.x版本
import user01 from "./user01";
import user02 from "./user02";
export default {
  components: {
    user01,
    user02
  },
  name: "App",
  data() {
    return {
      qiniuUPtoken: {
        user01: {
          code: 0,
          userId: "",
          token: ""
        },
        user02: {
          code: 0,
          userId: "",
          token: ""
        }
      },
      im: ""
    };
  },
  created() {
    // this.im = RongIMLib.init({
    //   appkey: "pwe86ga5p9gq6"
    // });
    // var conversationList = []; // 当前已存在的会话列表
    // this.im.watch({
    //   conversation: function(event) {
    //     var updatedConversationList = event.updatedConversationList; // 更新的会话列表
    //     console.log("更新会话汇总:", updatedConversationList);
    //     console.log(
    //       "最新会话列表:",
    //       im.Conversation.merge({
    //         conversationList,
    //         updatedConversationList
    //       })
    //     );
    //   },
    //   message: function(event) {
    //     var message = event.message;
    //     console.log("收到新消息:", message);
    //   },
    //   status: function(event) {
    //     var status = event.status;
    //     console.log("连接状态码:", status);
    //   }
    // });
  },
  mounted() {
    this.gettoken();
  },
  methods: {
    async gettoken() {
      let { data } = await axios.get("http://localhost:3000/");
      this.qiniuUPtoken = data;
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