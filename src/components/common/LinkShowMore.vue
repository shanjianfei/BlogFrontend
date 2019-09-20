<template>
  <el-link class="more" type="primary" :underline="false">{{words}}<i class="el-icon-caret-right"></i></el-link>
</template>

<script>
export default {
  name: 'LinkShowMore',
  props: ['words']
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  @import "~@/style/base";
  .more {
    .el-link--inner {
      .fontC(@common-blue);
    }
  }
</style>
