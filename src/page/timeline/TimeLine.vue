<template>
  <div class="main loading-text timeline-page">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="16">
        wer
        <div class="timeline-content" v-if="blogs.length > 0">
          <timeline-head
            @change="handleChange"
            @lasted="getLastedBlogs"
            @hot="getHotBlogs"
            @default="getBlogs"
          ></timeline-head>
          <el-timeline>
            <timeline-item
              v-for="(item, index) in blogs"
              :article="item"
              :key="index"
            ></timeline-item>
          </el-timeline>
          <show-more-button
            @loadMore="loadMoreArticles"
            :status="showMore"
          ></show-more-button>
        </div>
        <!-- <el-timeline v-if="blogs.length>0">
          <el-timeline-item v-for="(item, index) in blogs"
                            :timestamp="item.create_time | formatDate"
                            placement="top"
                            :key="index">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->
        <tips-no-data v-if="blogs.length === 0"></tips-no-data>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        :xs="0"
        :sm="0"
        :md="0"
        :lg="8"
        style="display: block"
      >
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
import { getDurationArticle, getBlogs } from '@/api/api'
import { util } from '@/config/mixin'
import TimelineItem from './children/TimelineItem'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'TimeLine',
  data () {
    return {
      page: 1,
      size: 6,
    }
  },
  computed: mapState('timeline', [
    'blogs',
    'nextPage',
    'dateSelect',
    'selected',
    'showMore'
  ]),
  components: { TipsNoData, ShowMoreButton, TagList, Recommend, HotArticle, TimelineHead, TimelineItem },
  created: function () {
    this.getBlogs()
  },
  methods: {
    ...mapActions('timeline', ['getTimelineInfo', 'updateSelect']),
    getBlogs () {
      let params = {
        page: this.page,
        size: this.size
      }
      this.getTimelineInfo({
        params,
        reset: true
      })
    },
    getLastedBlogs () {
      let params = {
        page: this.page,
        size: this.size,
        ordering: '-create_time',
      }
      this.updateSelect('lasted')
      this.getTimelineInfo({
        params,
        reset: true
      })
    },
    getHotBlogs () {
      let params = {
        page: this.page,
        size: this.size,
        ordering: '-click',
      }
      this.updateSelect('hot')
      this.getTimelineInfo({
        params,
        reset: true
      })
    },
    handleChange (dateSelected) { // 按时间范围过滤article
      let formatDate = this.$options.filters.formatDate
      let minDatetime = formatDate(dateSelected[0], 'yyyy-MM-dd')
      let maxDatetime = formatDate(dateSelected[1], 'yyyy-MM-dd')
      let params = {
        page: this.page,
        size: this.size,
        min_datetime: minDatetime,
        max_datetime: maxDatetime
      }
      this.getTimelineInfo({
        params,
        reset: true
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
      this.getTimelineInfo({ params })
    }
  },
  mixins: [util]
}
</script>
<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.timeline-page {
  .padding(0, 10px);
  .timeline-content {
    .el-timeline {
      .margin(top, 20px);
    }
  }
}
</style>
