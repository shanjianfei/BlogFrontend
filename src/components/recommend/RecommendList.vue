<template>
  <div class="recommend-list"  v-if="articles.length>0">
    <subnav-section-title :title="title" style="padding: 0 15px"></subnav-section-title>
    <div class="recommend-list-content">
      <recommend-list-cell v-for="(item, index) in articles" :article="item" :key="index"></recommend-list-cell>
    </div>
  </div>
</template>
<script>
import {getArticleList} from '@/api/api'
import RecommendListCell from './children/RecommendListCell'
import SubnavSectionTitle from '@/components/SubnavSectionTitle'

export default {
  name: 'Recommend',
  data () {
    return {
      page: 1,
      size: 6,
      articles: [],
      title: '推荐'
    }
  },
  components: {RecommendListCell, SubnavSectionTitle},
  created: function () {
    let self = this
    let params = {
      isrecommend: 2,
      page: this.page,
      size: this.size
    }
    getArticleList(params)
      .then(function (data) {
        self.articles = data['results']
      })
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .recommend-list {
    border-left: 1px solid @border-3;
    &-content {
      .padding(0, 15px);
    }
  }
</style>
