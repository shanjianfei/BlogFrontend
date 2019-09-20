<template>
  <div class="input-search-container">
    <el-input placeholder="请输入内容" v-model="searchData">
      <el-button slot="append" icon="el-icon-search" @click="$emit('search', searchData)"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  data () {
    return {
      searchData: ''
    }
  }
}
</script>

<style scoped>

</style>
