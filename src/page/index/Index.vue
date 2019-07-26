<template>
  <div class="index">
    <header>
      <router-view name="header"></router-view>
    </header>
    <main>
      <router-view name="main"></router-view>
    </main>
    <footer>
      <router-view name="footer"></router-view>
      <div class="scroll-container"
           v-show="upIsShow">
        <el-row class="up-container">
          <el-button class="up"
                     size="small"
                     icon="el-icon-caret-top"
                     @click="backTop"></el-button>
        </el-row>
        <el-row class="down-container">
          <el-button class="down"
                     size="small"
                     icon="el-icon-caret-bottom"
                     @click="goDown"></el-button>
        </el-row>
      </div>
    </footer>
  </div>
</template>

<script>
import { getSiteInfo } from '@/api/api'
import Top from '@/components/Top'
import Login from '@/components/Login'
export default {
  name: 'Index',
  data () {
    return {
      upIsShow: false, // 控制返回顶部按钮显现
      asideNav: false
    }
  },
  components: { Top, Login },
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
          top: window.pageYOffset + 500,
          behavior: 'smooth'
        }
      )
    },
    getSiteInfo () {
      // let self = this
      getSiteInfo()
        .then(function (data) {
          if (data.length) {
            // self.$store.dispatch('updateSiteInfo', data[0])
          }
        })
    }
  },
  mounted: function () {
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
@import "~@/style/mixin";
@import "~@/style/base";
.index {
  header {
    .z-index(100);
    .fixedTop;
  }
  main {
    min-height: calc(100vh - 45px);
    .margin(60px, auto, 0);
    .padding(top, 15px);
  }
  .scroll-container {
    position: fixed;
    right: 30px;
    bottom: 100px;
    .fontC(@common-blue);
    .down-container {
      .margin(top, 5px);
    }
    .up,
    .down {
      .display;
      .fontC(@base-white);
      .bgc(@common-gray);
    }
  }
}
body {
  @media screen and (min-width: 1200px) {
    main {
      .w(1200px);
    }
  }
}
</style>
