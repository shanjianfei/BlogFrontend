<template>
  <div class="button-container" v-if="status.show">
    <el-button
      type="primary"
      @click="$emit('loadMore')"
      :disabled="!status.status"
      >{{ status.text }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'ButtonShowMore',
  props: {
    status: {
      type: Object,
      default: function () {
        return {
          show: true,
          status: false,
          text: '加载完毕'
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.button-container {
  .margin(60px);
  button {
    .w100;
  }
}
</style>
