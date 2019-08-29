<template>
  <el-row class="article-detail-content">
    <el-col class="left"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="16">
      <div class="article-detail-container">
        <header class="article-title">
          {{article.title}}
        </header>
        <section>
          <div class="article-tag">
            <ul>
              <li v-for="(item, index) in article.tags"
                  :key="index">
                {{item}}
              </li>
            </ul>
          </div>
          <el-row class="article-base-info">
            <el-col :span="12">
              <ul>
                <li>
                  <span>作者</span>
                  <span>/</span>
                  <span>{{article.author}}</span>
                </li>
                <li>
                  <span>创建时间</span>
                  <span>/</span>
                  <span>{{article.create_time | formatDatetime}}</span>
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>
                  <i class="el-icon-view"></i>
                  <span>{{article.click}}</span>
                  <span>点击</span>
                </li>
                <li @click="returnComments">
                  <i class="el-icon-chat-line-square"></i>
                  <span>{{comments.length}}</span>
                  <span>评论</span>
                </li>
                <li @click="like">
                  <i class="el-icon-star-on"></i>
                  <span>{{article.like}}</span>
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
          <div class="article-content"
               v-html="article.content"></div>
        </section>
        <footer>
          <span class="create-time">
            <span>文章创建于</span>
            <span>{{article.create_time | formatDatetime}}</span>
          </span>
          <span class="update-time">
            <span>更新于</span>
            <span>{{article.update_time | formatDatetime}}</span>
          </span>
        </footer>
      </div>
      <div class="comment-container">
        <add-comment :articleId="articleId"
                     :commentEnable="!article.comment_enable"
                     v-on:add-comment="refreshComment"></add-comment>
        <show-comment :articleId="articleId"
                      ref="showComment"></show-comment>
      </div>
    </el-col>
    <el-col class="hidden-sm-and-down right"
            :xs="0"
            :sm="0"
            :md="0"
            :lg="8"
            style="display: block; padding-left: 20px">
      <recommend-list style="margin-bottom: 20px"></recommend-list>
    </el-col>
  </el-row>
</template>

<script>
import AddComment from '@/components/AddComment'
import ShowComment from '@/components/ShowComment'
import RecommendList from '@/components/recommend/RecommendList'
import { getArticleDetail, articleLike, getComments } from '@/api/api'
import Vue from 'vue'
export default {
  name: 'ArticleDetailContent',
  components: { AddComment, ShowComment, RecommendList },
  data () {
    return {
      articleId: '',
      comments: [],
      article: {
        author: '',
        click: 0,
        content: ',',
        create_time: '',
        like: 0,
        tags: [],
        title: '',
        update_time: '',
        comment_enable: true,
        desc: ''
      }
    }
  },
  watch: {
    '$route': function (to, from) {
      let self = this
      let articleId = to.params.id
      getArticleDetail(articleId)
        .then(function (data) {
          self.article = data
        })
        .catch(function (error) {
          console.log(error)
        })
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
    this.articleId = this.$route.params.id
    let self = this
    getArticleDetail(this.articleId)
      .then(function (data) {
        self.article = data
      })
      .catch(function (error) {
        console.log(error)
      })
    this.getComments()
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
