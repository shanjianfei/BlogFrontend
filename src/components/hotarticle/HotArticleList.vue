<template>
  <div class="hot-article-list" v-if="articles.length>0">
    <subnav-section-title :title="title" style="padding: 0 15px"></subnav-section-title>
    <div class="hot-article-list-content">
      <hot-article-list-cell v-for="(item, index) in articles" :key="index" :article="item"></hot-article-list-cell>
    </div>
  </div>
</template>
<script>
import {getArticleList} from '@/api/api'
import HotArticleListCell from '@/components/hotarticle/children/HotArticleListCell'
import SubnavSectionTitle from '@/components/SubnavSectionTitle'

export default {
  name: 'HotArticleList',
  props: {
      articles: {
          type: Array,
          default: []
      }
  },
  data: function () {
    return {
      page: 1,
      size: 6,
      title: '热门'
    }
  },
  components: {HotArticleListCell, SubnavSectionTitle},
  methods: {
    getHotArticle () {
      let params = {
        ordering: '-click',
        page: this.page,
        size: this.size
      }
      let self = this
      getArticleList(params).then(function (data) {
        self.articles = data.results
      })
    }
  },
  created: function () {
    this.getHotArticle()
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .hot-article-list {
    border-left: 1px solid @border-3;
    &-content {
      .padding(0, 15px);
    }
  }
</style>
