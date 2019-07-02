<template>
  <div class="home">
    <top-article></top-article>
    <el-row>
      <el-col class="left" :xs="24" :sm="24" :md="24" :lg="16" style="padding: 0 10px">
        <section-title
          :menus="articles.menus"
          :titleEn="articles.titleEn"
          :titleZh="articles.titleZh"
          @handleSelectMenu="handleSelectMenu"></section-title>
        <article-brief-list></article-brief-list>
      </el-col>
      <el-col class="hidden-sm-and-down right" :xs="0" :sm="0" :md="0" :lg="8" style="display: block; padding-left: 20px">
        <blogger-info></blogger-info>
        <recommend-list style="margin-bottom: 20px"></recommend-list>
        <hot-article-list style="margin-bottom: 20px"></hot-article-list>
        <tags style="margin-bottom: 20px"></tags>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopArticle from '@/components/Top'
import ArticleBriefList from '@/components/article/Article'
import BloggerInfo from '@/components/BloggerInfo'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'
import SectionTitle from '@/components/SectionTitle'

import {mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
    TopArticle,
    ArticleBriefList,
    BloggerInfo,
    Tags,
    RecommendList,
    HotArticleList,
    SectionTitle
  },
  data () {
    return {
      ordering: undefined,
      articles: {
        titleZh: '文章',
        titleEn: 'Article',
        menus: [
          {
            name: 'latest',
            subMenu: '最新',
            selected: false,
            method: 'latest'
          },
          {
            name: 'hot',
            subMenu: '最热',
            selected: false,
            method: 'hot'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading']),
    handleSelectMenu (method) {
      switch (method) {
        case 'latest':
          this.ordering = '-update_time'
          break
        case 'hot':
          this.ordering = '-click'
          break
      }
      let params = {
        ordering: this.ordering,
        page: 1,
        size: 6
      }
      this.getArticleList({params, reset: true})
    }
  },
  created () {
    let params = {
      page: 1,
      size: 6
    }
    this.getArticleList({params, reset: true})
  }
}
</script>
