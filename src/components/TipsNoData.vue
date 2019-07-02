<template>
  <div class="tips-container" v-if="showTip">
    <el-button type="warning" plain>目前还没有东西展示呢~~~</el-button>
  </div>
</template>

<script>
export default {
  name: 'TipsNoData',
  props: {
    showTip: {
      default: false
    }
  }
}
</script>

<style scoped lang="less">
  .tips-container {
    margin-top: 50px;
    text-align: center;
  }
</style>
