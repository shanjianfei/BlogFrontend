<template>
  <div class="button-container">
    <el-button type="primary" @click="$emit('loadMore')" :disabled="!status.enable">{{status.text}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'ButtonShowMore',
  props: ['status']
}
</script>

<style scoped lang="less">
  .button-container {
    margin: 60px;
    button {
      width: 100%;
    }
  }
</style>
