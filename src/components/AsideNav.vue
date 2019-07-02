<template>
  <div class="aside-menu-container">
    <el-menu
      class="aside-menu"
      active-text-color="#ffd04b"
      @select="handleSelect">
      <el-submenu index="article" v-if="articleCategory.length">
        <template slot="title">文章</template>
        <el-menu-item v-for="(item, i) in articleCategory" :key="i" :index="item.category" >{{item.category}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="timeline">
        <span slot="title">时间轴</span>
      </el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
      <el-menu-item index="rss">
        RSS订阅
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideNav',
  props: ['articleCategory'],
  methods: {
    handleSelect: function (index, indexPath) {
      this.$emit('select', index, indexPath)
    }
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';
  .aside-menu-container {
    .abs(full);
    .bgc(rgba(144,147,153,0.4));
    .z-index(10);
    .aside-menu {
      .w(200px);
      .h100;
      .padding(top, 60px);
      .bgc(@base-white);
    }
  }
</style>
