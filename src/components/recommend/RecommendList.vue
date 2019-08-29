<template>
  <div class="recommend-list"
       v-if="recommendArticles.length > 0">
    <subnav-section-title :title="title"
                          style="padding: 0 15px"></subnav-section-title>
    <div class="recommend-list-content">
      <recommend-list-cell v-for="(item, index) in recommendArticles"
                           :article="item"
                           :key="index"
                           :extra="index===0?true:false"></recommend-list-cell>
    </div>
  </div>
</template>
<script>
import { getArticles } from '@/api/api'
import RecommendListCell from './children/RecommendListCell'
import SubnavSectionTitle from '@/components/SubnavSectionTitle'

export default {
  name: 'Recommend',
  data () {
    return {
      page: 1,
      size: 6,
      title: '推荐',
      recommendArticles: []
    }
  },

  components: { RecommendListCell, SubnavSectionTitle },
  created: function () {
    let self = this
    let params = {
      isrecommend: true,
      page: this.page,
      size: this.size
    }
    getArticles(params).then(function (data) {
      self.recommendArticles = data.results
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.recommend-list {
  border-left: 1px solid @border-3;
  .bgc(@base-white);
  &-content {
    .padding(15px, 15px, 0);
  }
}
</style>
