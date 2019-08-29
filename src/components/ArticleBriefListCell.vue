<template>
  <div class="article-brief-container"
       v-if="article">
    <div class="article-cover"
         v-if="article.cover">
      <el-image style="width: 100%; height: 200px"
                :src="article.cover"></el-image>
    </div>
    <div class="article"
         :span="article.picture ? 18 : 24">
      <div class="article-title">
        <el-link :underline="false"
                 @click="$router.push({path: 'article/' + article.id})">
          {{article.title}}
        </el-link>
      </div>
      <div class="article-tag">
        <ul>
          <li v-for="(item, index) in article.tags"
              :key="index">
            <el-tag size="mini"
                    :style="{'color': item.color, 'border': '1px solid ' + item.color}">
              {{item.label}}
            </el-tag>
          </li>
        </ul>
      </div>
      <div class="article-content">
        <p>
          {{article.desc}}
          <link-show-more :urlPath="'article/' + article.id"
                          words="查看更多"></link-show-more>
        </p>
      </div>
      <div class="article-base-info">
        <ul>
          <li>
            {{article.update_time | formatDate('yyyy-MM-dd hh:mm:ss')}}
          </li>
          <li>
            <i class="el-icon-view"></i>
            <span>{{article.click}}</span>
            <span>点击</span>
          </li>
          <li>
            <i class="el-icon-chat-line-square"></i>
            <span>{{article.comment_count}}</span>
            <span>评论</span>
          </li>
          <li>
            <i class="el-icon-star-on"></i>
            <span>{{article.like}}</span>
            <span>点赞</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LinkShowMore from '@/components/LinkShowMore'
import { getImageUrl } from '@/config/util'
import { util } from '@/config/mixin'

export default {
  name: 'Article',
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  components: { LinkShowMore },
  methods: {
    getImageUrl (imageUrl) {
      return getImageUrl(imageUrl)
    }
  },
  mixins: [util]
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.article-brief-container {
  .margin(top, 10px);
  text-align: left;

  .bgc(@base-white);
  &:hover {
    border-color: @border-1;
    border: 1px solid @border-3;
    .borderRadius(0.2rem);
  }
  .article {
    .padding(15px);

    .article-title {
      .el-link {
        .fontSC(1.5rem, @main-word);
        &:hover {
          .fontC(@common-blue);
        }
      }
    }
    &-tag {
      .margin(15px, 0);
      li {
        .displayI;
        .margin(right, 5px);
      }
    }
    &-content {
      .fontSC(0.95rem, @common-word);
    }
    &-base-info {
      li {
        .displayI;
        .margin(right, 20px);
        .fontSC(0.8rem, @secondary-word);

        &:hover {
          .fontC(@common-yellow);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
