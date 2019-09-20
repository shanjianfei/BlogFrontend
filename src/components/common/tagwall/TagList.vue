<template>
  <div class="tag-list" v-if="tags.length>0">
    <div class="tag-list-title">
      <span>标签墙</span>
    </div>
    <div class="tag-list-content">
      <tag-list-cell v-for="(tag, index) in tags" :tag="tag" :key="index"></tag-list-cell>
    </div>
  </div>
</template>

<script>
import {getTags} from '@/api/api'
import TagListCell from './children/TagListCell'
export default {
  name: 'TagList',
  data: function () {
    return {
      tags: []
    }
  },
  components: {TagListCell},
  created: function () {
    let self = this
    getTags()
      .then(function (data) {
        self.tags = data
      })
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .tag-list {
    border-left: 1px solid @border-3;
    .bgc(@base-white);
    &-title {
      .flexV;
      text-align: left;
      .padding(0, 15px);
      .h(2rem);
      .fontS(1.2rem);
      border-left: 5px solid @common-blue;
    }
    &-content {
      .margin(top, 15px);
      .padding(0, 15px);
      text-align: left;
    }
  }
</style>
