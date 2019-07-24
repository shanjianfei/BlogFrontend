<template>
  <div class="header-container" id="header">
    <div class="header-hor">
      <el-collapse-transition>
        <div class="full-hd" v-show="show">
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="6"  class="logo-container">
              <a href="/">
                <el-image :src="getImageUrl(logo)">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </a>
              <span>{{motto}}</span>
            </el-col>
            <el-col :span="6">
              <input-search @search="search"></input-search>
            </el-col>
            <el-col :span="12">
              <el-menu
                :default-active="activeItem"
                mode="horizontal"
                background-color="#2c3e50"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect">
                <!-- <el-submenu index="article" v-if="articleCategory.length">
                  <template slot="title">文章</template>
                  <el-menu-item v-for="(item, i) in articleCategory" :key="i" :index="item.category">{{item.category}}</el-menu-item>
                </el-submenu> -->
                <el-submenu :index="item.index" v-for="(item, index) in category" :key="index" v-if="item.sub_category.length>0">
                  
                  <template slot="title">{{item.name}}</template>
                  

                  <el-menu-item :index="category1.index" v-for="(category1, index1) in item.sub_category" v-if="category1.sub_categorylevel.length===0" :key="index1">{{category1.name}}</el-menu-item>
                  <el-submenu :index="category1.index" v-for="(category1, index1) in item.sub_category" :key="index1" v-if="category1.sub_categorylevel.length>0">
                    <template slot="title">{{category1.name}}</template>
                    <el-menu-item :index="category2.index" v-for="(category2, index2) in category1.sub_categorylevel" v-if="category2.sub_categorylevel.length===0" :key="index2">{{category2.name}}</el-menu-item>
                    <el-submenu :index="category2.index" v-for="(category2, index2) in category1.sub_categorylevel" v-if="category2.sub_categorylevel.length>0" :key="index2">
                      <template slot="title">{{category2.name}}</template>
                      <el-menu-item :index="category3.index" v-for="(category3, index3) in category2.sub_categorylevel" :key="index3">{{category3.name}}</el-menu-item>
                      <el-menu-item :index="category3.index"></el-menu-item>
                    </el-submenu>
                  </el-submenu>
                </el-submenu>
                <el-menu-item :index="item.index" v-for="(item, index) in category" :key="index" v-if="item.sub_category.length===0">{{item.name}}</el-menu-item>

                <el-menu-item index="timeline">时间轴</el-menu-item>
                <el-menu-item index="about">关于</el-menu-item>
                <el-menu-item index="rss">
                  RSS订阅
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div class="brief-hd">
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="6">
              <i class="el-icon-menu" @click="showAsideNav"></i>
            </el-col>
            <el-col :span="12">
              <transition name="el-zoom-in-top">
                <div v-show="!showSearch">
                  <a href="/">
                    <el-image :src="getImageUrl(logo)">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </a>
                  <span>{{motto}}</span>
                </div>
              </transition>
              <transition name="el-zoom-in-bottom">
                <div v-show="showSearch">
                  <input-search @search="search"></input-search>
                </div>
              </transition>
            </el-col>
            <el-col :span="6">
              <i class="el-icon-search" @click="showSearch = !showSearch"></i>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </div>
    <transition name="el-zoom-in-left">
      <aside-nav v-if="asideNav" @select="handleSelect" @click.native="handleClickAsideNavWrap" :articleCategory="articleCategory"></aside-nav>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getImageUrl} from '@/config/util'
import {getCategory} from '@/api/api'
import InputSearch from '@/components/InputSearch'
import AsideNav from '@/components/AsideNav'

export default {
  name: 'Head',
  data () {
    return {
      activeItem: '',
      show: true,
      pageYOffset: 0,
      showSearch: false,
      category: [],
      asideNav: false
    }
  },
  computed: {
    ...mapState({
      logo: 'logo',
      motto: 'motto'
    })
  },
  components: {InputSearch, AsideNav},
  methods: {
    search (data) {
      if (data) {
        let query = {}
        query['title'] = data
        this.$router.push({path: '/article', query})
      }
    },
    getImageUrl (originUrl) {
      return getImageUrl(originUrl)
    },
    showAsideNav () {
      this.asideNav = !this.asideNav
    },
    handleClickAsideNavWrap (event) {
      if (event.target.className === 'aside-menu-container') {
        this.asideNav = false
      }
    },
    handleSelect (index, indexPath) {
      this.asideNav = false
      document.body.style.overflow = 'auto'
      if (indexPath.length === 2) {
        this.$router.push({path: '/article', query: {category: index}})
      } else if (index === 'timeline') {
        this.$router.push({path: '/timeline'})
      } else if (index === 'about') {
        this.$router.push({path: '/article', query: {category: 'about'}})
      } else if (index === 'rss') {
        let {href} = this.$router.resolve('/rss')
        window.open(href)
      }
    }
  },
  mounted: function () {
    let self = this
    if (window.pageYOffset > 60) {
      this.show = false
      this.pageYOffset = window.pageYOffset
    }
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > self.pageYOffset) {
        self.show = false
      } else {
        self.show = true
      }
      self.pageYOffset = window.pageYOffset
    })
    getCategory()
      .then(function (data) {
        self.category = data
        console.log(data)
      })
  }
}
</script>

<style lang="less">
  @import '~@/style/mixin';
  @import '~@/style/base';
  #header {
    .span {
      .fontSC(.85rem, @base-white);
    }
    img {
      .wh(50px, 50px);
      .borderRadius(50%);
      .padding(5px, 0);
      vertical-align: middle;
    }
    .el-icon-picture-outline {
      .fontC(@base-white);
    }
    .header-hor {
      display: block;
      .full-hd {
        .bgc(#2c3e50);

        .el-col {
          .bgc(#2c3e50);
        }

        .el-col:last-child {
          ul {
            .flexH(flex-end);
            .margin(right, 20px);
          }
        }

        .logo-container {
          span {
            .span;
          }
        }

        .el-menu--horizontal {
          border: none;
        }
      }

      .brief-hd {
        display: none;
        .bgc(#2c3e50);

        .el-row {
          .h(60px);

          .el-col:first-child {
            text-align: left;

            i {
              .fontSC(1.5rem, @base-white);
              .margin(left, 15px);
            }
          }

          .el-col:nth-child(2) {
            span {
              .span;
            }
          }

          .el-col:last-child {
            text-align: right;

            i {
              .fontSC(1.5rem, @base-white);
              .margin(right, 15px);
            }
          }
        }
      }
    }
  }
  body {
    @media screen and (max-width: 860px) {
      #header {
        .header-hor {
          .full-hd {
            .displayN;
          }
          .brief-hd {
            .display;
          }
        }
      }
    }
  }
</style>
