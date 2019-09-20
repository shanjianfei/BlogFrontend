<template>
  <div class="home-content">
    <top :topArticles="topArticles"></top>
    <el-row>
      <el-col class="left" :lg="16">
        <section-title
          :titleZh="article.titleZh"
          :titleEn="article.titleEn"
          :menus="article.menus"
          :viewMore="article.viewMore"
          @handleSelectMenu="handleSelectMenu"
          @refresh="refreshArticle"
        ></section-title>
        <article-brief-list-cell
          :article="article"
          v-for="(article, index) in articles"
          :key="index"
        ></article-brief-list-cell>
      </el-col>
      <el-col
        class="hidden-md-and-down right"
        :lg="8"
        style="padding-left: 20px"
      >
        <blogger-info></blogger-info>
        <recommend-list style="margin-bottom: 20px"></recommend-list>
        <hot-article-list style="margin-bottom: 20px"></hot-article-list>
        <tags style="margin-bottom: 20px"></tags>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Top from '@/components/common/Top'
import SectionTitle from '@/components/common/SectionTitle'
import ArticleBriefListCell from '@/components/common/article/ArticleBriefListCell'
import Tags from '@/components/common/tagwall/TagList'
import RecommendList from '@/components/common/recommend/RecommendList'
import HotArticleList from '@/components/common/hotarticle/HotArticleList'
import BloggerInfo from '@/components/common/BloggerInfo'

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
      'loading',
      'topArticles'
    ])
  },
  components: {
    Top,
    SectionTitle,
    ArticleBriefListCell,
    Tags,
    RecommendList,
    HotArticleList,
    BloggerInfo
  },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading', 'getTopArticles']),
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
    this.getTopArticles()
  }
}
</script>
