<template>
  <div class="timeline-item">
    <el-tag class="left" size="small">{{
      article.update_time | formatDate("yyyy-MM-dd")
    }}</el-tag>
    <div class="right">
      <div>
        <el-link
          :underline="false"
          @click="$router.push({ path: 'article/' + article.id })"
        >
          <h3 class="article-title">{{ article.title }}</h3>
        </el-link>
        <el-link
          :underline="false"
          @click="show = !show"
          style="color: #409EFF"
        >
          <span v-if="!show">查看简介</span>
          <span v-else>隐藏简介</span>
        </el-link>
      </div>
      <el-collapse-transition>
        <p class="article-desc" v-show="show">
          {{ article.desc }}
        </p>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { util } from '@/config/mixin'

export default {
  name: 'TimeLineItem',
  data () {
    return {
      show: false // 显示文章简介
    }
  },
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
@import "~@/style/mixin";
@import "~@/style/base";
.timeline-item {
  display: flex;
  align-items: flex-start;
  
  .left {
    .margin(right, 15px);
  }
  .right {
    text-align: left;
    .article-title {
      .fontW(500);
    }
    .article-title:hover {
      .fontC(@common-blue);
    }
    .article-desc {
      .margin(0);
      .padding(top, 15px);
    }
  }
}
</style>
