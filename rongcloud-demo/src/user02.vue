<template>
  <div>02
    <input type="text" v-model="val"><button @click="submit">发送</button>
  </div>
</template>

<script>
import axios from "axios";
import * as qiniu from "qiniu-js"; //七牛云js-sdk2.x版本
export default {
  props: {
    user: {}
  },
  name: "user02",
  data() {
    return {
      qiniuUPtoken: "",
      im: "",
      val:''
    };
  },
  created() {
    this.im = RongIMLib.init({
      appkey: "pwe86ga5p9gq6"
    });
    var conversationList = []; // 当前已存在的会话列表
    var that = this
    this.im.watch({
      conversation: function(event) {
        var updatedConversationList = event.updatedConversationList; // 更新的会话列表
        console.log("02==更新会话汇总:", updatedConversationList);
        console.log(
          "最新会话列表:",
          that.im.Conversation.merge({
            conversationList,
            updatedConversationList
          })
        );
      },
      message: function(event) {
        var message = event.message;
        console.log("02==收到新消息:", message);
      },
      status: function(event) {
        var status = event.status;
        console.log("02==连接状态码:", status);
      }
    });
  },
  mounted() {},
  methods: {
    submit(){
      this.send('01',this.val)
    },
    connect(params) {
      var user = {
        token: params.token
      };
      this.im
        .connect(user)
        .then(function(user) {
          console.log("02==链接成功, 链接用户 id 为: ", user.id);
        })
        .catch(function(error) {
          console.log("02==链接失败: ", error.code, error.msg);
        });
    },
    send(targetId,content) {
      var conversation = this.im.Conversation.get({
        targetId,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
      });
      conversation
        .send({
          messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
          content: {
            content  // 文本内容
          }
        })
        .then(function(message) {
          console.log("发送文字消息成功", message);
        });
    }
  },
  watch: {
    user(o, v) {
      this.connect(o);
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