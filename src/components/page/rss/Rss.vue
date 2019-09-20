<template>
  <div class="rss-container">
    <p>{{rss}}</p>
  </div>
</template>

<script>
import {getRss} from '@/api/api'

export default {
  name: 'Rss',
  data () {
    return {
      rss: ''
    }
  },
  created () {
    let self = this
    getRss()
      .then(function (data) {
        self.rss = data
      })
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';
  .rss-container {
    text-align: left;
    font-family: "Microsoft YaHei";
    .fontSC(.9rem, @base-black);
    .margin(10px);
  }
</style>
