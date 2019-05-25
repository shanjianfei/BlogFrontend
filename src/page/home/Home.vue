<template>
  <div class="main">
    <el-row>
      <top-article></top-article>
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="article-container loading-text" v-if="article.length">
          <el-row class="header">
            <el-col class="header-left" :span="12">
              <i class="el-icon-document"></i>
              <span class="title-zh">文章</span>
              <span class="vertical-line"></span>
              <span class="title-en">Article</span>
            </el-col>
            <el-col class="header-right" :span="12">
              <ul @click="handleToggleTab">
                <li class="lasted" :class="{ active: activeName === 1 }">
                  <span>最新</span>
                </li>
                <li class="hot" :class="{ active: activeName === 2 }">
                  <span>最热</span>
                </li>
              </ul>
            </el-col>
          </el-row>
          <article-info v-for="(item, index) in article" :article="item" :key="index"></article-info>
        </div>
        <tips-no-data v-else></tips-no-data>
        <button-show-more v-if="article.length" @loadMore="handelLoadMore(result.next)" :status="showMoreButtonText"></button-show-more>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" style="display: block">
        <recommend></recommend>
        <tags @selectTag="handleSelectTag"></tags>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TipsNoData from '@/components/TipsNoData'
import ButtonShowMore from '@/components/ButtonShowMore'
import Tags from '@/components/Tags'
import Recommend from '@/components/Recommend'
import ArticleInfo from './children/Article'
import TopArticle from '@/components/Top'
import {getArticleList} from '@/api/api'
export default {
  name: 'Home',
  data () {
    return {
      article: [], // 显示在首页的文章
      articleTop: [], // 置顶的文章
      activeName: 1, // 默认按照时间排序文章
      result: {}, // 分页获取的结果
      showMoreButtonText: { // 显示更多按钮
        enable: true,
        text: '显示更多'
      }
    }
  },
  components: {
    ArticleInfo,
    TipsNoData,
    ButtonShowMore,
    Tags,
    Recommend,
    TopArticle
  },
  watch: {
    '$route': function (to, from) {
      let filter = this.$route.query
      if (!('ordering' in filter)) {
        filter['ordering'] = '-update_time'
      }
      this.getArticleList(filter)
    }
  },
  methods: {
    getArticleList (filter) {
      let self = this
      let attr = ''
      for (let key in filter) {
        attr += key + '=' + filter[key] + '&'
      }
      getArticleList(attr)
        .then(function (data) {
          self.result = data
          self.article = self.result['results']
          if (!data.next) {
            self.showMoreButtonText.enable = false
            self.showMoreButtonText.text = '没有更多了'
          }
        })
    },
    handelLoadMore (url) {
      let self = this
      let next = url.split('?')[1]
      getArticleList(next)
        .then(function (data) {
          self.result = data
          if ('results' in self.result) {
            self.article = self.article.concat(self.result.results)
          }
          if (!self.result['next']) {
            self.showMoreButtonText.enable = false
            self.showMoreButtonText.text = '没有更多了'
          }
        })
    },
    handleToggleTab (event) {
      let target = event.target
      this.showMoreButtonText = {
        enable: true,
        text: '显示更多'
      }
      let filter = this.$route.query || {}
      let data = ''
      if (target.className === 'lasted' || target.parentNode.className === 'lasted') {
        this.activeName = 1
        data = '-update_time'
      } else if (target.className === 'hot' || target.parentNode.className === 'hot') {
        this.activeName = 2
        data = '-click'
      }
      filter['ordering'] = data
      this.getArticleList(filter)
    }
  },
  created: function () {
    let filter = this.$route.query
    if (!('ordering' in filter)) {
      filter['ordering'] = '-update_time'
    }
    this.getArticleList(filter)
  }
}
</script>

<style scoped lang="less">
  .main {
    margin: 10px 30px;
    .article-container {
      margin: 20px 0;
      .header {
        padding: 20px 0;
        text-align: left;
        .header-left {
          .el-icon-document {
            font-size: 1.5rem;
            margin-right: 5px;
            vertical-align: middle;
            color: peru;
          }
          .title-zh {
            font-size: 1.5rem;
            font-weight: 500;
            vertical-align: middle;
          }
          .vertical-line {
            display: inline-block;
            height: 25px;
            vertical-align: middle;
            margin: 0 5px;
            border-right: 1px solid #000000;
          }
          .title-en {
            font-size: 1.5rem;
            vertical-align: middle;
          }
        }
        .header-right {
          text-align: right;
          ul {
            .active {
              border-bottom: 3px solid #409EFF;
            }
            li {
              margin-right: 10px;
              height: 2rem;
              display: inline-block;
              cursor: pointer;
              span {
                line-height: 2rem;
              }
            }
          }
        }
      }
    }
  }
</style>
