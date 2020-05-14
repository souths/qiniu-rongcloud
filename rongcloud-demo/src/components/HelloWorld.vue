<template>
  <div class="hello">
    <h1>{{ msg |mo}}</h1>
    <h2>Essential Links==>{{$route.params.id}}</h2>
    <h2>Essential Links==>{{$route.params.name?'更新':'保存'}}</h2>

    <router-link :to="{name:'home'}">home</router-link>
    <router-link :to="{name:'add'}">add</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "2018-10-02 15:40:20"
    };
  },
  mounted() {},
  watch: {
    '$route':{
      handler: function() {
      if (this.$route.params.id) {
        console.log("meiy");
      } else {
        console.log("yfdsafdasf");
      }
    },
      immediate: true
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
