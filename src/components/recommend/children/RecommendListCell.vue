<template>
  <div class="recommend-list-cell">
    <div class="article-title">
      <el-link
        :underline="false"
        @click="$router.push({path: 'article/' + article.id})">
        {{article.title}}
      </el-link>
    </div>
    <div class="article-base-info">
      <ul class="article-base-info-left">
        <li>
          {{article.update_time | formatDate('yyyy-mm-dd')}}
        </li>
      </ul>
      <ul class="article-base-info-right">
        <li>
          <i class="el-icon-view"></i>
          <span>{{article.click}}</span>
        </li>
        <li>
          <i class="el-icon-chat-line-square"></i>
          <span>{{article.comment.length}}</span>
        </li>
        <li>
          <i class="el-icon-star-off"></i>
          <span>{{article.like}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {util} from '@/config/mixin'
export default {
  name: 'RecommendListCell',
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [util]
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .recommend-list-cell {
    .margin(top, 15px);
    text-align: left;
    .article-title {
      .el-link {
        .fontS(1rem);
      }
    }
    .article-base-info {
      .margin(top, 5px);
      display: flex;
      justify-content: space-between;
      &-left, &-right {
        li {
          .displayI;
          .margin(right, 5px);
          .fontC(@secondary-word);
          .fontS(.8rem);

          &:hover {
            .fontC(@common-yellow);
            cursor: pointer;
          }
        }
      }
      &-left {
        text-align: left;
      }
      &-right {
        text-align: right;
      }
    }
  }
</style>
