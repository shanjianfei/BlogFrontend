<template>
  <div class="main loading-text">
    <el-row>
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="timeline-container">
          <el-row class="timeline-head" type="flex" align="middle">
            <el-col class="head-left" :span="8" style="text-align: left">
              <i class="el-icon-document"></i>
              <span class="title-zh">时光轴</span>
              <span class="vertical-line"></span>
              <span class="title-en">Timeline</span>
            </el-col>
            <el-col class="head-right" :span="16">
              <el-row type="flex" align="middle" justify="end">
                <el-tabs v-model="activeName" @tab-click="filterArticle" :stretch="true" style="display: inline-block">
                  <el-tab-pane label="最新" name="latest"></el-tab-pane>
                  <el-tab-pane label="最热" name="hot"></el-tab-pane>
                </el-tabs>
                <div class="block" style="margin-left: 20px">
                  <el-date-picker
                    v-model="dateSelect"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="onChange">
                  </el-date-picker>
                </div>
                <el-link icon="el-icon-refresh" style="margin-left: 20px" :underline="false" @click="refresh"></el-link>
              </el-row>
            </el-col>
          </el-row>
          <el-timeline v-if="timelimeTab.length">
            <el-timeline-item
              :timestamp="item.article.create_time | formatDatetime"
              placement="top" v-for="(item, i) in timelimeTab"
              :key="i"
              size="large"
              color="#409EFF">
              <el-card>
                <el-row type="flex" align="middle">
                  <el-col :span="4" style="text-align: left">
                    <el-tag size="small">{{item.article.create_time | formatDatetime}}</el-tag>
                  </el-col>
                  <el-col :span="20" style="text-align: left">
                    <h3 style="display: inline-block;">{{item.article.title}}</h3>
                    <el-link
                      type="primary"
                      :underline="false"
                      :icon="item.icon"
                      @click="onClick(i, $event)"
                      style="margin-left: 10px">
                      {{item.text}}
                    </el-link>
                    <el-collapse-transition>
                      <p v-show="item.showEnable">
                        {{item.article.brief_introduction}}
                      </p>
                    </el-collapse-transition>
                  </el-col>
                </el-row>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <show-more-buton v-if="timelimeTab.length > 0" @showMore="showMoreArticles(result.next)" :status="showMoreButtonText"></show-more-buton>
          <tips-no-data v-else></tips-no-data>
        </div>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" style="display: block">
        <recommend></recommend>
        <tags @selectTag="handleSelectTag"></tags>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TipsNoData from '@/components/TipsNoData'
import ShowMoreButon from '@/components/ButtonShowMore'
import Tags from '@/components/Tags'
import Recommend from '@/components/Recommend'
import {getArticleList} from '@/api/api'
import Vue from 'vue'
export default {
  name: 'TimeLine',
  data () {
    return {
      timelimeTab: [],
      result: {},
      activeName: 'latest',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateSelect: '',
      showMoreButtonText: {
        enable: true,
        text: '显示更多'
      }
    }
  },
  components: {TipsNoData, ShowMoreButon, Tags, Recommend},
  created: function () {
    this.filterArticle()
  },
  methods: {
    getPostData (postData) {
      if (postData) {
        postData += '&'
      } else {
        postData = ''
      }
      if (this.activeName === 'latest') {
        postData += 'ordering=-update_time'
      } else if (this.activeName === 'hot') {
        postData += 'ordering=-click'
      }
      return postData
    },
    onClick (i, event) {
      let target = event.target
      let text = target.innerText.trim()
      if (text === '查看简介') {
        this.timelimeTab[i].icon = 'el-icon-caret-top'
        target.innerText = '隐藏简介'
        this.timelimeTab[i].showEnable = true
      } else if (text === '隐藏简介') {
        this.timelimeTab[i].icon = 'el-icon-caret-bottom'
        target.innerText = '查看简介'
        this.timelimeTab[i].showEnable = false
      }
    },
    filterArticle (postData) {
      let self = this
      postData = this.getPostData(postData)
      this.timelimeTab = []
      getArticleList(postData)
        .then(function (data) {
          if ('results' in data) {
            self.result = data
            for (let i in data.results) {
              let item = {}
              item['article'] = data.results[i]
              item['icon'] = 'el-icon-caret-bottom'
              item['text'] = '查看简介'
              item['showEnable'] = false
              self.timelimeTab.push(item)
            }
            if (!self.result['next']) {
              self.showMoreButtonText.enable = false
              self.showMoreButtonText.text = '没有更多了'
            } else {
              self.showMoreButtonText.enable = true
              self.showMoreButtonText.text = '显示更多'
            }
          }
        })
    },
    refresh () {
      this.timelimeTab = []
      this.activeName = 'latest'
      this.dateSelect = ''
      this.filterArticle()
    },
    onChange (dateSelect) {
      let startTime = Vue.formatDate(new Date(dateSelect[0]), 'yyyy-MM-dd')
      let endTime = Vue.formatDate(new Date(dateSelect[1]), 'yyyy-MM-dd')
      let postData = 'min_datetime=' + startTime + '&max_datetime=' + endTime
      this.filterArticle(postData)
    },
    showMoreArticles (url) {
      let self = this
      let postData = url.split('?')[1]
      postData = this.getPostData(postData)
      getArticleList(postData)
        .then(function (data) {
          if ('results' in data) {
            self.result = data
            for (let i in data.results) {
              let item = {}
              item['article'] = data.results[i]
              item['icon'] = 'el-icon-caret-bottom'
              item['text'] = '查看简介'
              item['showEnable'] = false
              self.timelimeTab.push(item)
            }
            if (!self.result['next']) {
              self.showMoreButtonText.enable = false
              self.showMoreButtonText.text = '没有更多了'
            }
          }
        })
    },
    handleSelectTag (tag) {
      this.$router.push({path: '/', query: {tags: tag}})
    }
  },
  filters: {
    formatDatetime (val) {
      return Vue.formatDate(new Date(val), 'yyyy-MM-dd hh:mm:ss').split(' ')[0]
    }
  }
}
</script>
<style scoped lang="less">
  .main {
    margin: 10px 30px;
    .timeline-head {
      padding: 20px 0;
      .head-left {
        .el-icon-document {
          font-size: 1.5rem;
          margin-right: 5px;
          vertical-align: middle;
          color: peru;
        }
        .title-zh {
          font-size: 1.5rem;
          font-weight: 500;
          vertical-align: middle;
        }
        .vertical-line {
          display: inline-block;
          height: 25px;
          vertical-align: middle;
          margin: 0 5px;
          border-right: 1px solid #000000;
        }
        .title-en {
          font-size: 1.5rem;
          vertical-align: middle;
        }
        .more {
          vertical-align: middle;
          margin-left: 20px;
        }
      }
    }
  }
</style>
