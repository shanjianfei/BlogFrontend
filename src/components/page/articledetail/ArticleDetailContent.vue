<template>
  <el-row class="article-detail-content" v-if="article">
    <el-col class="left" :lg="16">
      <div class="article-detail-container">
        <header class="article-title">
          {{ article.title }}
        </header>
        <section>
          <div class="article-tag">
            <ul>
              <li v-for="(item, index) in article.tags" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <el-row class="article-base-info">
            <el-col :span="12">
              <ul>
                <li>
                  <span>作者</span>
                  <span>/</span>
                  <span>{{ article.author }}</span>
                </li>
                <li>
                  <span>创建时间</span>
                  <span>/</span>
                  <span>{{ article.create_time | formatDatetime }}</span>
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>
                  <i class="el-icon-view"></i>
                  <span>{{ article.click }}</span>
                  <span>点击</span>
                </li>
                <li @click="returnComments">
                  <i class="el-icon-chat-line-square"></i>
                  <span>{{ comments.length }}</span>
                  <span>评论</span>
                </li>
                <li @click="like">
                  <i class="el-icon-star-on"></i>
                  <span>{{ article.like }}</span>
                  <span>点赞</span>
                </li>
              </ul>
            </el-col>
          </el-row>
          <div class="article-brief">
            <p>
              <span>简介：</span>
              {{ article.brief_introduction }}
            </p>
          </div>
          <div class="article-content" v-html="article.content"></div>
        </section>
        <footer>
          <span class="create-time">
            <span>文章创建于</span>
            <span>{{ article.create_time | formatDatetime }}</span>
          </span>
          <span class="update-time">
            <span>更新于</span>
            <span>{{ article.update_time | formatDatetime }}</span>
          </span>
        </footer>
      </div>
      <div class="comment-container">
        <!-- <keep-alive> -->
        <add-comment
          :articleId="articleId"
          :commentEnable="!article.comment_enable"
          v-on:add-comment="refreshComment"
        ></add-comment>
        <!-- </keep-alive> -->
        <show-comment :articleId="articleId" ref="showComment"></show-comment>
      </div>
    </el-col>
    <el-col
      class="hidden-md-and-down right"
      :lg="8"
      style="padding-left: 20px"
    >
      <recommend-list style="margin-bottom: 20px"></recommend-list>
      <hot-article-list style="margin-bottom: 20px"></hot-article-list>
      <tags style="margin-bottom: 20px"></tags>
    </el-col>
  </el-row>
</template>

<script>
import AddComment from '@/components/common/comment/AddComment'
import ShowComment from '@/components/common/comment/ShowComment'
import RecommendList from '@/components/common/recommend/RecommendList'
import Tags from '@/components/common/tagwall/TagList'
import HotArticleList from '@/components/common/hotarticle/HotArticleList'
import { getArticleDetail, articleLike, getComments } from '@/api/api'
import { validPassword } from '@/config/mixin'
import Vue from 'vue'
export default {
  name: 'ArticleDetailContent',
  components: { AddComment, ShowComment, RecommendList, Tags, HotArticleList },
  data () {
    return {
      articleId: '',
      comments: [],
      article: undefined
    }
  },
  watch: {
    '$route': function (to, from) {
      this.getArticleContent()
    }
  },
  methods: {
    like: function () {
      let self = this
      articleLike(this.articleId)
        .then(function (data) {
          self.article.like += 1
          self.$message({
            message: data.result,
            type: 'success'
          })
        })
        .catch(function () {
          self.$message.error('点赞失败')
        })
    },
    refreshComment: function () {
      this.$refs['showComment'].refresh()
      this.returnComments()
    },
    getComments: function () {
      let self = this
      getComments(this.articleId)
        .then(function (data) {
          self.comments = data
        })
    },
    returnComments: function () {
      let eleCom = document.querySelector('#comments')
      if (eleCom) {
        eleCom.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
      }
    },
    getArticleContent () {
      this.articleId = this.$route.params.id
      let password = this.$route.query.password
      let self = this
      getArticleDetail(this.articleId, password)
        .then(function (data) {
          if ('result' in data && data['result'] === 'fail') {
            validPassword.call(self, self.articleId, 'article')
          } else {
            self.getComments()
            self.article = data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  filters: {
    formatDatetime (val) {
      return Vue.formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created: function () {
    window.scrollTo({
      top: 0
    })
    this.getArticleContent()
  }
}
</script>

<style scoped lang="less">
.article-detail-container {
  text-align: left;
  margin: 0px auto;
  margin-bottom: 55px;
  border-bottom: 1px dotted #999999;
  .article-title {
    font-size: 1.8rem;
    color: #333;
    font-weight: 500;
  }
  .article-tag {
    margin: 15px 0;
    li {
      padding: 4px 6px;
      display: inline-block;
      margin-right: 0.8rem;
      border-radius: 3px;
      background-color: #cc9933;
      color: #fff;
      font-size: 0.6rem;
    }
  }
  .article-base-info {
    .el-col:last-child {
      text-align: right;
    }
    li {
      display: inline-block;
      margin-right: 20px;
      color: #999;
      font-size: 0.8rem;
    }
    li:hover {
      color: #cc9933;
      cursor: pointer;
    }
  }
  .article-brief {
    margin: 15px 0;
    padding: 3px 12px;
    background-color: #ddd;
    font-size: 0.9rem;
    p {
      line-height: 1.5rem;
    }
  }
  footer {
    text-align: right;
    font-size: 0.6rem;
    margin-bottom: 10px;
    .create-time {
      margin-right: 10px;
    }
  }
}
.reviewer-info {
  max-width: 850px;
  margin: 0 auto;
  text-align: left;
  .el-input {
    width: 200px;
  }
}
.add-commnet-module {
  max-width: 850px;
  margin: 0 auto;
  text-align: left;
}
</style>