<template>
  <el-row class="category">
    <el-col class="left" :lg="16">
      <div class="level level1" v-show="categoryControl.level1.show">
        <span class="level-title">一级:</span>
        <ul class="level-items">
          <li
            class="level-item"
            :class="{ active: categoryControl.level1.selected === 0 }"
            @click="select('level1', 0)"
          >
            <el-link :underline="false">全部</el-link>
          </li>
          <li
            class="level-item"
            :class="{ active: categoryControl.level1.selected === 1 }"
            @click="select('level1', 1)"
          >
            <el-link :underline="false">文章</el-link>
          </li>
        </ul>
      </div>
      <div class="level level2" v-show="categoryControl.level2.show">
        <span class="level-title">二级:</span>
        <ul class="level-items">
          <li
            class="level-item"
            :class="{ active: categoryControl.level2.selected === 0 }"
            @click="select('level2', 0)"
          >
            <el-link :underline="false">全部</el-link>
          </li>
          <li
            class="level-item"
            :class="
              categoryControl.level2.selected === index + 1
                ? 'active'
                : 'inactive'
            "
            v-for="(val, index) in subCategory"
            :key="index"
            @click="select('level2', index + 1)"
          >
            <el-link :underline="false">{{ val.name }}</el-link>
          </li>
        </ul>
      </div>

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
import SectionTitle from '@/components/SectionTitle'
import ArticleBriefListCell from '@/components/ArticleBriefListCell'
import Tags from '@/components/tagwall/TagList'
import RecommendList from '@/components/recommend/RecommendList'
import HotArticleList from '@/components/hotarticle/HotArticleList'
import { getCategory, getArticles } from '@/api/api'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      baseCategory: undefined,
      subCategory: undefined,
      categoryControl: {
        level1: { show: true, selected: 0 },
        level2: { show: false, selected: 0 },
        level3: { show: false, selected: 0 }
      },
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
  components: { SectionTitle, ArticleBriefListCell, Tags, RecommendList, HotArticleList },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading']),
    getCategory (index) {
      let self = this
      getCategory(index).then(function (response) {
        console.log(response)
        self.subCategory = response[0].sub_category
      })
    },
    select (level, index) {
      this.categoryControl[level]['selected'] = index
      if (this.categoryControl.level1.selected > 0) {
        this.categoryControl.level2.show = true
      } else {
        this.categoryControl.level2.show = false
        this.categoryControl.level2.selected = 0
      }

      if (this.categoryControl.level2.selected > 0) {
        this.categoryControl.level3.show = true
      } else {
        this.categoryControl.level3.show = false
        this.categoryControl.level3.selected = 0
      }
    },
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
  created () {
    let categorylevel1 = this.$route.params.categorylevel1
    let categorylevel2 = this.$route.params.categorylevel2
    let categorylevel3 = this.$route.params.categorylevel3
    let index = this.$route.path.split('/')[1]
    this.baseCategory = index
    this.getCategory(index)
    let params = {
      page: 1,
      size: 6
    }
    this.getArticleList({ params, reset: true })
  }
}
</script>
<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.active {
  .bgc(@common-gray);
  border-radius: 3px;
  .el-link--default {
    .fontC(@base-white);
  }
}
.category {
  text-align: left;
  .level {
    .level-title {
      .fontS(17px);
      .fontW(700);
    }
    .margin(top, 15px);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .level-items {
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      .level-item {
        margin-left: 5px;
        padding: 5px;
      }
    }
  }
}
</style>
