<template>
    <div>
        我是home主机
        <router-link :to="{name:'World',params:{id:'world'}}">World</router-link>
         <router-link :to="{name:'us'}">us</router-link>
    </div>
</template>

<script>
    export default {
        name:'home'
    }
</script>

<style scoped>

</style>