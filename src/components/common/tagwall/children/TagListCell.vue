<template>
  <div class="tags-list-cell">
    <el-tag
      class="tag"
      size="small"
      :color="tag.color"
      :hit="false"
      effect="dark"
    >
      {{ tag.label }} [{{ tag.article_count }}]
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'TagListCell',
  props: {
    tag: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.tags-list-cell {
  .margin(0, 5px, 15px);
  .displayI;
  .tag {
    cursor: pointer;
    border: 0;
  }
}
</style>
