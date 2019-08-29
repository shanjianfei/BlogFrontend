<template>
  <el-row class="home-content">
    <el-col class="left"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="16">
      <section-title :titleZh="article.titleZh"
                     :titleEn="article.titleEn"
                     :menus="article.menus"
                     :viewMore="article.viewMore"
                     @handleSelectMenu="handleSelectMenu"
                     @refresh="refreshArticle"></section-title>
      <article-brief-list-cell :article="article"
                               v-for="(article, index) in articles"
                               :key="index"></article-brief-list-cell>
    </el-col>
    <el-col class="hidden-sm-and-down right"
            :xs="0"
            :sm="0"
            :md="0"
            :lg="8"
            style="display: block; padding-left: 20px">
      <recommend-list style="margin-bottom: 20px"></recommend-list>
      <hot-article-list style="margin-bottom: 20px"></hot-article-list>
      <tags style="margin-bottom: 20px"></tags>
    </el-col>
  </el-row>
</template>
<script>
import SectionTitle from '@/components/SectionTitle'
import ArticleBriefListCell from '@/components/ArticleBriefListCell'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeContent',
  data () {
    return {
      ordering: '',
      article: {
        titleZh: '文章',
        titleEn: 'Article',
        viewMore: {
          routeName: 'Article',
          text: '查看更多'
        },
        menus: {
          latest: {
            name: 'latest',
            subMenu: '最新',
            selected: false,
            method: 'latest'
          },
          hot: {
            name: 'hot',
            subMenu: '最热',
            selected: false,
            method: 'hot'
          }
        }
      }
    }
  },
  computed: {
    ...mapState('articleList', [
      'articles',
      'nextPage',
      'showTip',
      'showMore',
      'loading'
    ])
  },
  components: {
    SectionTitle,
    ArticleBriefListCell,
    Tags,
    RecommendList,
    HotArticleList
  },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading']),
    latest: function () {
      let params = {
        ordering: '-update_time',
        page: 1,
        size: 6
      }
      this.getArticleList({ params, reset: true })
    },
    hot: function () {
      let params = {
        ordering: '-click',
        page: 1,
        size: 6
      }
      this.getArticleList({ params, reset: true })
    },
    handleSelectMenu (name) {
      for (let m in this.article.menus) {
        if (m !== name) {
          this.article.menus[m].selected = false
        } else {
          this.article.menus[m].selected = true
        }
      }
      switch (name) {
        case 'latest':
          this.latest()
          break
        case 'hot':
          this.hot()
          break
      }
    },
    refreshArticle () {
      for (let m in this.article.menus) {
        this.article.menus[m].selected = false
      }
      let params = {
        page: 1,
        size: 6
      }
      this.getArticleList({ params, reset: true })
    }
  },
  created: function () {
    let params = {
      page: 1,
      size: 6
    }
    this.getArticleList({ params, reset: true })
  }
}
</script>
