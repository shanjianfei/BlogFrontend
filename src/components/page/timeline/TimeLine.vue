<template>
  <div class="main loading-text timeline-page">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="16">
        <div class="timeline-content">
          <timeline-head
            @change="handleChange"
            @setFilterConditions="setFilterConditions"
          ></timeline-head>

          <el-timeline>
            <template v-for="(value, key) in blogs">
              <el-timeline-item
                class="year"
                :key="key"
                :timestamp="key + '年'"
                placement="top"
                size="large"
                icon="el-icon-s-order"
                type="primary"
                color="#409EFF"
              >
              </el-timeline-item>
              <el-timeline-item
                v-for="(blogs, month) in value"
                class="month"
                :key="month"
                :timestamp="month + '月'"
                placement="top"
                icon="el-icon-time"
                type="success"
              >
                <el-card
                  v-for="(blog, index) in blogs"
                  :key="index"
                  style="margin-top: 10px"
                >
                  <timeline-item :article="blog"></timeline-item>
                </el-card>
              </el-timeline-item>
            </template>
            <el-timeline-item
              size="large"
              icon="el-icon-more-outline"
              type="primary"
              v-if="showMore"
            >
            </el-timeline-item>
            <el-timeline-item
              size="large"
              icon="el-icon-finished"
              type="primary"
              v-else
            >
            </el-timeline-item>
          </el-timeline>
          <show-more-button
            @loadMore="loadMoreArticles"
            :status="showMore"
          ></show-more-button>
        </div>
        <tips-no-data :tip="tip"></tips-no-data>
        {{ blogs }}
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
import TipsNoData from '@/components/common/TipsNoData'
import ShowMoreButton from '@/components/common/ButtonShowMore'
import TagList from '@/components/common/tagwall/TagList'
import Recommend from '@/components/common/recommend/RecommendList'
import HotArticle from '@/components/common/hotarticle/HotArticleList'
import TimelineHead from './children/TimelineHead'
import { util } from '@/config/mixin'
import TimelineItem from './children/TimelineItem'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'TimeLine',
  data () {
    return {
      page: 1,
      size: 6,
      ordering: '',
      minDatetime: '',
      maxDatetime: ''
    }
  },
  computed: mapState('timeline', [
    'blogs',
    'nextPage',
    'dateSelect',
    'selected',
    'showMore',
    'tip'
  ]),
  components: { TipsNoData, ShowMoreButton, TagList, Recommend, HotArticle, TimelineHead, TimelineItem },
  created: function () {
    this.filterBlogs()
  },
  methods: {
    ...mapActions('timeline', ['getTimelineInfo', 'updateSelect']),
    getParams () {
      let params = {
        page: this.page,
        size: this.size
      }
      if (this.ordering) {
        params.ordering = this.ordering
      }
      if (this.minDatetime && this.maxDatetime) {
        params.min_datetime = this.minDatetime
        params.max_datetime = this.maxDatetime
      }
      return params
    },
    handleChange (dateSelected) { // 按时间范围过滤article
      if (dateSelected) {
        this.minDatetime = dateSelected[0]
        this.maxDatetime = dateSelected[1]
      } else {
        this.minDatetime = ''
        this.maxDatetime = ''
      }
    },
    loadMoreArticles () {
      let params = this.getParams()
      params.page = this.nextPage
      this.getTimelineInfo({ params })
    },
    setFilterConditions (con, data) {
      switch (con) {
        case 'hot': this.ordering = '-click'; this.minDatetime = ''; this.maxDatetime = ''; this.updateSelect('hot'); break
        case 'lasted': this.ordering = '-update_time'; this.minDatetime = ''; this.maxDatetime = ''; this.updateSelect('lasted'); break
        case 'pick': this.handleChange(data); break
        default: this.ordering = ''; this.minDatetime = ''; this.maxDatetime = ''
      }
      this.filterBlogs()
    },
    filterBlogs () {
      this.getTimelineInfo({
        params: this.getParams(),
        reset: true
      })
    }
  },
  mixins: [util]
}
</script>
<style lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.timeline-page {
  .padding(0, 10px);
  text-align: left;
  .timeline-content {
    .el-timeline {
      .margin(top, 20px);
    }
  }
  // .block {
  //   text-align: left;
  // }
}
.el-timeline-item__node--large {
  left: -13px;
  width: 36px;
  height: 36px;
  top: -3px;
  .el-timeline-item__icon {
    font-size: 25px;
  }
}
.el-timeline-item__node--normal {
  left: -8px;
  width: 26px;
  height: 26px;
  .el-timeline-item__icon {
    font-size: 23px;
  }
}
.year {
  .el-timeline-item__timestamp {
    color: @main-word;
    line-height: 1.5;
    font-size: 23px;
    .margin(left, 10px);
  }
}

.month {
  .el-timeline-item__timestamp {
    color: @common-word;
    line-height: 1.5;
    font-size: 16px;
    .margin(left, 10px);
  }
}
</style>
