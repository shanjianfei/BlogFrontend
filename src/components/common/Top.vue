<template>
  <div class="top-container" v-if="topArticles.length > 0">
    <el-row class="top-content">
      <el-col class="top-left" :xs="24" :sm="24" :md="16" :lg="16">
        <el-carousel
          height="300px"
          :autoplay="false"
          arrow="always"
          @change="changeCarousel"
          ref="carouselHorizontal"
        >
          <el-carousel-item
            v-for="(item, index) in topArticles"
            :key="index"
          >
            <h3
              @click="$router.push({ path: 'article/' + item.id })"
              style="cursor:pointer;"
            >
              {{ item.title }}
            </h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col
        class="top-right"
        style="display: block;"
        :md="8"
        :lg="8"
        :xs="0"
        :sm="0"
      >
        <el-carousel
          height="300px"
          direction="vertical"
          :autoplay="false"
          @change="changeCarousel"
          ref="carouselVertical"
        >
          <el-carousel-item v-for="(item, index) in topArticles" :key="index">
            <article>
              <h3 class="medium">{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <el-button
                type="primary"
                @click="$router.push({ path: 'article/' + item.id })"
                >查看更多</el-button
              >
            </article>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Top',
  props: {
    'topArticles': {
      type: Array,
      default: undefined
    }
  },
  methods: {
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
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.top-container {
  .padding(0, 10px);
  .margin(bottom, 15px);
  border: 1px solid #eee;
  .top-left {
    .el-carousel__item h3 {
      line-height: 300px;
    }
    .el-carousel__item:nth-child(2n) {
      .bgc(#99a9bf);
    }
    .el-carousel__item:nth-child(2n + 1) {
      .bgc(#d3dce6);
    }
  }
  .top-right {
    text-align: left;
    article {
      margin: 20px;
      p {
        .fontS(0.95rem);
      }
    }
  }
}
</style>
