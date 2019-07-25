<template>
  <div class="article">
    <div class="article-container loading-text" v-if="articles.length">
      <div class="article-brief-list">
        <article-brief v-for="(item, index) in articles" :article="item" :key="index"></article-brief>
        <div id="loading" v-loading="loading"></div>
      </div>
    </div>
    <tips-no-data :showTip="showTip"></tips-no-data>
    <button-show-more v-if="articles.length" @loadMore="handelLoadMore" :status="showMore"></button-show-more>
  </div>
</template>

<script>
// import ArticleBrief from '@/components/article/children/ArticleBriefListCell'
import TipsNoData from '@/components/TipsNoData'
import ButtonShowMore from '@/components/ButtonShowMore'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'

import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'Article',
  data () {
    return {
      ordering: 'default', // 排序方式 default lasted hot
      activeName: 1 // 默认按照时间排序文章
    }
  },
  computed: {
    ...mapState('articleList', ['articles', 'nextPage', 'showTip', 'showMore', 'hotArticles', 'loading'])
  },
  components: {
    // ArticleBrief,
    TipsNoData,
    ButtonShowMore,
    Tags,
    RecommendList,
    HotArticleList
  },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading']),
    ...mapMutations('articleList', ['updateShowMore']),
    handelLoadMore () {
      this.updateShowMore({status: false})
      this.showLoading()
      let params = {}
      switch (this.ordering) {
        case 'default':
          params = {ordering: '-update_time'}
          break
        case 'lasted':
          params = {ordering: '-update_time'}
          break
        case 'hot':
          params = {ordering: '-click'}
          break
      }
      params['page'] = this.nextPage
      this.getArticleList({params, reset: false})
    }
  },
  created: function () {
    let params = {ordering: '-update_time'}
    this.getArticleList({params, reset: true})
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .article {
      .article-container {
        text-align: left;

        .article-brief-list {
          #loading {
            .margin(top, 30px);
          }
        }
      }
  }
</style>
