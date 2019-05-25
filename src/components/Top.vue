<template>
  <div class="top-continer">
    <el-row class="top-content" v-if="topArticles.length">
      <el-col class="top-left" :xs="24" :sm="24" :md="16" :lg="16">
        <el-carousel
          height="300px"
          :autoplay="false"
          arrow="always"
          @change="changeCarousel"
          ref="carouselHorizontal">
          <el-carousel-item v-for="(item, index) in topArticles" :key="index">
            <h3>{{ item.title }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col class="top-right" style="display: block;" :xs="0" :sm="0" :md="8" :lg="8">
        <el-carousel
          height="300px"
          direction="vertical"
          :autoplay="false"
          @change="changeCarousel"
          ref="carouselVertical">
          <el-carousel-item v-for="(item, index) in topArticles" :key="index">
            <article>
              <h3 class="medium">{{ item.title }}</h3>
              <p>{{ item.brief_introduction }}</p>
              <el-button type="primary" @click="$router.push({path: 'article/' + item.id})">查看更多</el-button>
            </article>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getArticleList} from '@/api/api'

export default {
  name: 'Top',
  data () {
    return {
      topArticles: []
    }
  },
  methods: {
    getTopArticles () {
      let self = this
      getArticleList('istop=2')
        .then(function (data) {
          if ('results' in data) {
            self.topArticles = data['results']
          }
        })
    },
    changeCarousel (index) {
      let hor = this.$refs.carouselHorizontal
      let ver = this.$refs.carouselVertical
      if (hor.activeIndex !== index) {
        hor.setActiveItem(index)
      }
      if (ver.activeIndex !== index) {
        ver.setActiveItem(index)
      }
    }
  },
  created () {
    this.getTopArticles()
  }
}
</script>

<style scoped lang="less">
  .top-continer {
    border: 1px solid #eee;
    .top-left {
      .el-carousel__item h3 {
        line-height: 300px;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
    .top-right {
      text-align: left;
      article {
        margin: 20px;
        p {
          font-size: .95rem;
        }
      }
    }
  }
</style>
