<template>
  <div class="hot-article-list"
       v-if="hotArticles.length>0">
    <subnav-section-title :title="title"
                          style="padding: 0 15px"></subnav-section-title>
    <div class="hot-article-list-content">
      <hot-article-list-cell v-for="(item, index) in hotArticles"
                             :key="index"
                             :article="item"></hot-article-list-cell>
    </div>
  </div>
</template>
<script>
import { getArticles } from '@/api/api'
import HotArticleListCell from '@/components/hotarticle/children/HotArticleListCell'
import SubnavSectionTitle from '@/components/SubnavSectionTitle'

export default {
  name: 'HotArticleList',
  data: function () {
    return {
      page: 1,
      size: 6,
      title: '热门',
      hotArticles: []
    }
  },
  components: { HotArticleListCell, SubnavSectionTitle },
  created: function () {
    let params = {
      ordering: '-click',
      page: this.page,
      size: this.size
    }
    let self = this
    getArticles(params).then(function (data) {
      self.hotArticles = data.results
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.hot-article-list {
  border-left: 1px solid @border-3;
  .bgc(@base-white);
  &-content {
    .padding(15px, 15px, 0);
  }
}
</style>
