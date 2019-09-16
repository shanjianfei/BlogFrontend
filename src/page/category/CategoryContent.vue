<template>
  <el-row class="category-content">
    <el-col class="left" :lg="16">
      <category></category>
      <section-title
        :titleZh="article.titleZh"
        :titleEn="article.titleEn"
        :menus="article.menus"
        :viewMore="article.viewMore"
        @handleSelectMenu="handleSelectMenu"
        @refresh="refreshArticle"
        style="margin-top: 30px"
      ></section-title>

      <article-brief-list-cell
        :article="article"
        v-for="(article, index) in articles"
        :key="index"
      ></article-brief-list-cell>
    </el-col>
    <el-col class="hidden-md-and-down right" :lg="8" style="padding-left: 20px">
      <recommend-list style="margin-bottom: 20px"></recommend-list>
      <hot-article-list style="margin-bottom: 20px"></hot-article-list>
      <tags style="margin-bottom: 20px"></tags>
    </el-col>
  </el-row>
</template>
<script>
import Category from './children/Category'
import SectionTitle from '@/components/SectionTitle'
import ArticleBriefListCell from '@/components/ArticleBriefListCell'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      article: {
        titleZh: '文章',
        titleEn: 'Article',
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
  components: { Category, SectionTitle, ArticleBriefListCell, Tags, RecommendList, HotArticleList },
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
  }
}
</script>
