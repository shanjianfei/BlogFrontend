<template>
  <el-row class="home">
    <el-col class="left" :xs="24" :sm="24" :md="24" :lg="16">
      <article-brief-list></article-brief-list>
    </el-col>
    <el-col class="hidden-sm-and-down right" :xs="0" :sm="0" :md="0" :lg="8" style="display: block; padding-left: 20px">
      <recommend-list style="margin-bottom: 20px"></recommend-list>
      <hot-article-list style="margin-bottom: 20px"></hot-article-list>
      <tags style="margin-bottom: 20px"></tags>
    </el-col>
  </el-row>
</template>

<script>
// import ArticleBrief from './children/ArticleBriefListCell'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'

// from 

export default {
  name: 'ArticleList',
  data () {
    return {
      article: undefined
    }
  },
  components: {
    // ArticleBriefList,
    Tags,
    RecommendList,
    HotArticleList
  },
  created: function () {
    getArticles
  }
}
</script>
