<template>
  <el-link class="more" type="primary" @click="$router.push({path: urlPath})" :underline="false">{{words}}<i class="el-icon-caret-right"></i></el-link>
</template>

<script>
export default {
  name: 'LinkShowMore',
  props: ['urlPath', 'words']
}
</script>

<style scoped>

</style>
