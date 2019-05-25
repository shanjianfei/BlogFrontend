<template>
  <div class="article-list-container">
    <el-row class="content-article" :gutter="1" type="flex" align="middle">
      <el-col class="article-base-info" :span="article.picture ? 18 : 24">
        <div class="article-title">
          <el-link @click="$router.push({path: 'article/' + article.id})">{{article.title}}</el-link>
        </div>
        <div class="article-tag">
          <ul>
            <li v-for="(item, index) in article.tags" :key="index">
              <el-tag size="small" :style="{'color': item.color, 'border': '1px solid ' + item.color}">
                {{item.label}}
              </el-tag>
            </li>
          </ul>
        </div>
        <div class="article-content">
          <p>
            {{article.brief_introduction}}
            <link-show-more :urlPath="'article/' + article.id" words="查看更多"></link-show-more>
          </p>
        </div>
        <div class="article-base-info">
        <ul>
          <li>
            {{article.update_time | formatDatetime}}
          </li>
          <li>
            <i class="el-icon-view"></i>
            <span>{{article.click}}</span>
            <span>点击</span>
          </li>
          <li>
            <i class="el-icon-chat-line-square"></i>
            <span>{{article.comment.length}}</span>
            <span>评论</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>{{article.like}}</span>
            <span>点赞</span>
          </li>
        </ul>
      </div>
      </el-col>
      <el-col class="article-image" :span="6" v-if="article.picture">
        <el-image
          style="height: 100px; width: 130px;"
          :src="getImageUrl(article.picture)">
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LinkShowMore from '@/components/LinkShowMore'
import Vue from 'vue'
import {getImageUrl} from '@/config/util'

export default {
  name: 'Article',
  props: ['article'],
  data () {
    return {
    }
  },
  components: {LinkShowMore},
  methods: {
    getImageUrl (imageUrl) {
      return getImageUrl(imageUrl)
    }
  },
  filters: {
    formatDatetime (value) {
      return Vue.formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped lang="less">
  .article-container {
    text-align: left;
    .content-article:hover {
      border-color: #ddd;
    }
    .content-article {
      border: 1px solid #eee;
      border-radius: .2rem;
      padding: 15px;
      .article-image {
        text-align: center;
        .el-image__inner {
          border-radius: 30px;
        }
      }
      .article-base-info {
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
        .article-title {
          a {
            font-size: 1.5rem;
          }
        }
        .article-tag {
          margin: 15px 0;
        }
        .article-content {
          font-size: .95rem;
        }
      }
    }
    .more {
      margin-left: 10px;
    }
  }
</style>
