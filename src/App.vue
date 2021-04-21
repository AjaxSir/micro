<template>
  <div id="micro">
   <router-view></router-view>
   <!-- <section v-show='!$route.name' id='frame' /> 主应用配置显示子应用容器 -->
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$utils.timeFormat(new Date())
  }
}
</script>

<style>
#micro {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
