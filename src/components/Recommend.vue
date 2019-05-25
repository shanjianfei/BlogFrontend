<template>
  <div class="recommend-container">
    <div class="title">
      <span>推荐</span>
    </div>
    <div class="article" v-for="(item, index) in article" :key="index">
      <div class="article-title">
        <el-link @click="$router.push({path: 'article/' + item.id})">{{item.title}}</el-link>
      </div>
      <ul class="article-base-info">
        <li>
          {{item.update_time | formatDatetime}}
        </li>
        <li>
          <i class="el-icon-view"></i>
          <span>{{item.click}}</span>
          <span>点击</span>
        </li>
        <li>
          <i class="el-icon-chat-line-square"></i>
          <span>{{item.comment.length}}</span>
          <span>评论</span>
        </li>
        <li>
          <i class="el-icon-star-off"></i>
          <span>{{item.like}}</span>
          <span>点赞</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {getArticleList} from '@/api/api'
export default {
  name: 'Recommend',
  data () {
    return {
      article: []
    }
  },
  created: function () {
    let self = this
    getArticleList('ordering=-click')
      .then(function (data) {
        if ('results' in data) {
          self.article = data['results']
        }
      })
  },
  filters: {
    formatDatetime (value) {
      return Vue.formatDate(new Date(value), 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped lang="less">
  .recommend-container {
    margin: 20px 30px;
    text-align: left;
    .title {
      height: 2rem;
      font-size: 1.5rem;
      border-left: 5px solid #409EFF;
      span {
        margin-left: 10px;
      }
    }
    .article {
      margin-top: 15px;
      .article-title {
        .el-link {
          font-size: 1rem;
        }
      }
      .article-base-info {
        margin-top: 5px;
        li {
          display: inline-block;
          margin-right: 20px;
          color: #999;
          font-size: .8rem;
        }

        li:hover {
          color: #CC9933;
          cursor: pointer;
        }
      }
    }
  }
</style>
