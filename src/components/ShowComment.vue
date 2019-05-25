<template>
  <div class="show-comment-module" id="comments">
    <el-divider><i class="el-icon-chat-dot-square"></i></el-divider>
    <div v-if="comments.length" class="comment-container">
      <div class="comment-label">
      <span>
        最新评论
      </span>
      </div>
      <div class="comment-content" v-for="(comment, index) in comments" :key="index">
        <el-row class="comment-header">
          <el-col :span="12">{{comment.author}}</el-col>
          <el-col :span="12">
            <span>{{comment.create_time | formatDatetime}}</span>
          </el-col>
        </el-row>
        <div class="comment-body" v-html="comment.content"></div>
        <div class="comment-bottom">
          <i class="el-icon-star-off" :class="{'like-active': comment.like>0}"></i>
          <span>{{comment.like}}</span>
        </div>
      </div>
    </div>
    <div v-else style="color: #909399; margin-top: 30px">暂无评论</div>
  </div>
</template>
<script>
import {getComments} from '@/api/api'
import Vue from 'vue'
export default {
  name: 'ShowComment',
  data () {
    return {
      comments: []
    }
  },
  mounted: function () {
    this.getComments(this.articleId)
  },
  methods: {
    getComments: function (articleId) {
      let self = this
      getComments(articleId)
        .then(function (data) {
          self.comments = data
        })
    },
    refresh: function () {
      this.getComments(this.articleId)
    }
  },
  filters: {
    formatDatetime (value) {
      return Vue.formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: ['articleId']
}
</script>

<style scoped lang="less">
  .show-comment-module {
    margin: 30px auto;
    max-width: 850px;
    text-align: left;
    .comment-container {
      .comment-label {
        border-left: 5px solid #CC9933;
        span {
          color: #CC9933;
          margin-left: 15px;
        }
      }
      .comment-content {
        padding: 15px 0;
        border-bottom: 1px dotted #999;

        .comment-header {
          font-size: .85rem;

          .el-col:first-child {
            color: #CC9933;
          }

          .el-col:last-child {
            text-align: right;
            color: #999;
          }
        }

        .comment-body {
          margin-top: 10px;
          font-size: .85rem;
        }

        .comment-bottom {
          text-align: right;
          font-size: .85rem;
          cursor: pointer;

          span {
            font-size: .85rem;
          }

          .like-active {
            color: #e6a23c;
          }
        }
      }
    }
  }
</style>
