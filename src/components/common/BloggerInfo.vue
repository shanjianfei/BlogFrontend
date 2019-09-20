<template>
  <div class="blogger-info" v-if="bloggerInfo">
    <div class="background">
      <img :src="bloggerInfo.background" style="height: 150px; width: 100%;" />
    </div>
    <a
      :href="item.url"
      class="social"
      v-for="(item, index) in bloggerInfo.social"
      :key="index"
    >
      <p>
        <b>{{ item.name }}</b>
      </p>
      <p>{{ item.desc }}</p>
      <img
        :src="getImageUrl(item.image)"
        style="height: 60px; width: 60px; border-radius: 50%; cursor: pointer"
      />
    </a>
  </div>
</template>

<script>
import { getBloggerInfo } from '@/api/api'
import { util } from '@/config/mixin'

export default {
  name: 'BloggerInfo',
  data () {
    return {
      bloggerInfo: undefined
    }
  },
  methods: {
    handleSocial (url) {
      window.open(url)
    }
  },
  created () {
    let self = this
    getBloggerInfo().then(function (data) {
      if (data.length > 0) {
        self.bloggerInfo = data[0]
      }
    })
  },
  mixins: [util]
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.blogger-info {
  .margin(bottom, 15px);
  .padding(bottom, 25px);
  border: 1px solid @border-3;
  .social {
    .displayI;
    text-decoration: none;
    color: @main-word;
    p {
      .fontS(12px);
    }
  }
}
</style>
