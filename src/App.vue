<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "element-ui/lib/theme-chalk/index.css";
@import "element-ui/lib/theme-chalk/display.css";
@import "./style/common.less";
@import "./style/base";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @main-word;
  height: 100%;
}
</style>
