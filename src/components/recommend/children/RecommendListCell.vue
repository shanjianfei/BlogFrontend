<template>
  <div class="recommend-list-cell">
    <div class="article-title">
      <el-link
        :underline="false"
        @click="$router.push({ path: 'article/' + article.id })"
        style="color: #303133; font-size: 18px"
      >
        {{ article.title }}
      </el-link>
    </div>
    <div class="extra-contont" v-if="extra">
      <ul>
        <li v-for="(item, index) in article.tags" :key="index">
          <el-tag
            size="mini"
            :style="{ color: item.color, border: '1px solid ' + item.color }"
          >
            {{ item.label }}
          </el-tag>
        </li>
      </ul>
      <div class="article-desc">
        <p>
          {{ article.desc }}
        </p>
      </div>
    </div>
    <div class="article-base-info">
      <ul class="article-base-info-left">
        <li>
          {{ article.update_time | formatDate("yyyy-mm-dd") }}
        </li>
      </ul>
      <ul class="article-base-info-right">
        <li>
          <i class="el-icon-view"></i>
          <span>{{ article.click }}</span>
        </li>
        <li>
          <i class="el-icon-chat-line-square"></i>
          <span>{{ article.comment_count }}</span>
        </li>
        <li>
          <i class="el-icon-star-off"></i>
          <span>{{ article.like }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { util } from '@/config/mixin'
export default {
  name: 'RecommendListCell',
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    extra: {
      type: Boolean,
      default: false
    }
  },
  mixins: [util]
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.recommend-list-cell {
  .padding(15px, 6px);
  border-top: 1px solid @border-3;
  text-align: left;
  .article-title {
    .el-link {
      .fontS(1rem);
    }
  }
  .extra-contont {
    .margin(top, 15px);
    li {
      .displayI;
      .margin(right, 5px);
    }
    .article-desc {
      p {
        .fontC(@common-word);
      }
    }
  }
  .article-base-info {
    .margin(top, 15px);
    display: flex;
    justify-content: space-between;
    &-left,
    &-right {
      li {
        .displayI;
        .margin(right, 5px);
        .fontC(@secondary-word);
        .fontS(0.8rem);

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
