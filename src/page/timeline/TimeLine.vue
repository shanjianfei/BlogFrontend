<template>
  <div class="main loading-text timeline-page">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="16">
        <div class="timeline-content" >
          <timeline-head
            @change="handleChange"
            @lasted="getLastedArticle"
            @hot="getHotArticle"
            @default="getArticle"></timeline-head>
          <el-timeline>
            <timeline-item v-for="(item, index) in articles" :article="item" :key="index"></timeline-item>
          </el-timeline>
          <show-more-button @loadMore="loadMoreArticles" :status="showMore"></show-more-button>
        </div>
        <tips-no-data v-if="articles.length === 0"></tips-no-data>
      </el-col>
      <el-col class="hidden-md-and-down" :xs="0" :sm="0" :md="0" :lg="8" style="display: block">
        <recommend style="margin-bottom: 20px"></recommend>
        <hot-article style="margin-bottom: 20px"></hot-article>
        <tag-list style="margin-bottom: 20px"></tag-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TipsNoData from '@/components/TipsNoData'
import ShowMoreButton from '@/components/ButtonShowMore'
import TagList from '@/components/tagwall/TagList'
import Recommend from '@/components/recommend/RecommendList'
import HotArticle from '@/components/hotarticle/HotArticleList'
import TimelineHead from './children/TimelineHead'
import {getDurationArticle} from '@/api/api'
import {util} from '@/config/mixin'
import TimelineItem from './children/TimelineItem'

import {mapState, mapActions} from 'vuex'

export default {
  name: 'TimeLine',
  data () {
    return {
      page: 1,
      size: 6
    }
  },
  computed: mapState('timeline', [
    'articles',
    'nextPage',
    'dateSelect',
    'selected',
    'showMore'
  ]),
  components: {TipsNoData, ShowMoreButton, TagList, Recommend, HotArticle, TimelineHead, TimelineItem},
  mixins: [util],
  created: function () {
    this.getArticle()
  },
  methods: {
    ...mapActions('timeline', ['getTimelineInfo', 'updateSelect']),
    getArticle () {
      let params = {
        page: this.page,
        size: this.size
      }
      this.getTimelineInfo({
        params,
        reset: true
      })
    },
    getLastedArticle () {
      let params = {
        ordering: '-update_time',
        page: this.page,
        size: this.size
      }
      this.updateSelect('lasted')
      this.getTimelineInfo({
        params,
        reset: true
      })
    },
    handleChange (dateSelected) { // 按时间范围过滤article
      let self = this
      this.selected = 'duration'
      let formatDate = this.$options.filters.formatDate
      let minDatetime = formatDate(dateSelected[0], 'yyyy-MM-dd')
      let maxDatetime = formatDate(dateSelected[1], 'yyyy-MM-dd')
      getDurationArticle(minDatetime, maxDatetime, this.page, this.size)
        .then(function (data) {
          self.articles = data.results
          self.page = data.next
          if (!data.next) {
            self.showMoreButtonText.enable = false
            self.showMoreButtonText.text = '没有更多了'
          } else {
            self.showMoreButtonText.enable = true
            self.showMoreButtonText.text = '显示更多'
          }
        })
    },
    loadMoreArticles () {
      let params = {
        page: this.page,
        size: this.size
      }
      if (this.selected === 'hot') {
        params.ordering = '-click'
      } else if (this.selected === 'lasted') {
        params.ordering = '-update_time'
      }
      this.getTimelineInfo({params})
    }
  }
}
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';
  .timeline-page {
    .padding(0, 10px);
    .timeline-content {
      .el-timeline {
        .margin(top, 20px);
      }
    }
  }
</style>
