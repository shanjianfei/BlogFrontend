<template>
  <div class="tips-container" v-if="tip.show">
    <el-button type="warning" plain>{{ tip.text }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'TipsNoData',
  props: {
    tip: {
      type: Object,
      default: function () {
        return {
          show: false,
          text: ''
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
.tips-container {
  margin-top: 50px;
  text-align: center;
  button {
    .w100;
  }
}
</style>
