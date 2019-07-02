<template>
  <div class="blogger-info" v-if="bloggerInfo && bloggerInfo.social.length>0">
    <div class="background">
      <img :src="bloggerInfo.background" style="height: 180px; width: 100%;">
    </div>
    <div class="social" v-for="(item, index) in bloggerInfo.social" :key="index">
      <p>{{item.name}}</p>
      <p>{{item.desc}}</p>
      <img :src="getImageUrl(item.image)" style="height: 50px; cursor: pointer" @click="handleSocial(item.url)">
    </div>
  </div>
</template>

<script>
import {getBloggerInfo} from '@/api/api'
import {util} from '@/config/mixin'

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
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .blogger-info {
    .social {
      p {
        .fontS(12px);
      }
    }
  }
</style>
