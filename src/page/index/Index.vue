<template>
  <el-container class="index">
    <el-header>
      <router-view name="header"></router-view>
    </el-header>
    <el-main>
      <router-view name="main"></router-view>
    </el-main>
    <el-footer>
      <router-view name="footer"></router-view>
    </el-footer>
    <div class="scroll-container" v-show="upIsShow">
      <el-row class="up-container">
        <el-button class="up" size="small" icon="el-icon-caret-top" @click="backTop"></el-button>
      </el-row>
      <el-row class="down-container">
        <el-button class="down" size="small" icon="el-icon-caret-bottom" @click="goDown"></el-button>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import {getSiteInfo} from '@/api/api'
import Top from '@/components/Top'

export default {
  name: 'Index',
  data () {
    return {
      upIsShow: false // 控制返回顶部按钮显现
    }
  },
  components: {Top},
  methods: {
    backTop () { // 页面返回到顶部
      window.scrollTo(
        {
          top: 0,
          behavior: 'smooth'
        }
      )
    },
    goDown () { // 页面向下滚动一段距离
      window.scrollTo(
        {
          top: window.pageYOffset + 300,
          behavior: 'smooth'
        }
      )
    },
    getSiteInfo () {
      let self = this
      getSiteInfo()
        .then(function (data) {
          self.$store.dispatch('updateSiteInfo', data[0])
        })
    }
  },
  created: function () {
    let self = this
    if (window.pageYOffset > 300) {
      this.upIsShow = true
    }
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        self.upIsShow = true
      } else {
        self.upIsShow = false
      }
    })
    this.getSiteInfo()
  }
}
</script>

<style scoped lang="less">
  .index {
    .el-header, .el-footer {
      padding: 0;
    }
    .scroll-container {
      position: fixed;
      right: 30px;
      bottom: 100px;
      color: #409EFF;

      .down-container {
        margin-top: 5px;
      }

      .up, .down {
        display: block;
        color: #fff;
        background-color: #999999;
      }
    }
  }
</style>
