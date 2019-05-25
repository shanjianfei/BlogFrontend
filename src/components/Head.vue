<template>
  <div class="header-container">
    <el-collapse-transition>
      <div class="full-hd" v-show="show && typeChoice === 0">
        <el-row type="flex" align="middle" justify="center">
          <el-col :span="6"  class="logo-container">
            <a href="/">
              <img :src="getImageUrl(logo)">
            </a>
            <span>{{motto}}</span>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="searchData">
              <el-button slot="append" icon="el-icon-search" @click="search('title', searchData)"></el-button>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-menu
              :default-active="activeItem"
              mode="horizontal"
              background-color="#2c3e50"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect">
              <el-submenu index="select">
                <template slot="title">文章</template>
                <el-menu-item index="python">Python</el-menu-item>
                <el-menu-item index="django">Django</el-menu-item>
                <el-menu-item index="javascript">JavaScript</el-menu-item>
                <el-menu-item index="linux">Linux</el-menu-item>
              </el-submenu>
              <el-menu-item index="timeline">时间轴</el-menu-item>
              <el-menu-item index="about">关于</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="brief-hd" v-show="show && typeChoice === 1">
        <el-row type="flex" align="middle" justify="center">
          <el-col :span="6">
            <i class="el-icon-menu"></i>
          </el-col>
          <el-col :span="12">
            <a href="/">
              <img :src="getImageUrl(logo)">
            </a>
            <span>{{motto}}</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-search"></i>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getImageUrl} from '@/config/util'

export default {
  name: 'Head',
  data () {
    return {
      searchData: '',
      activeItem: '',
      show: true,
      pageYOffset: 0,
      typeChoice: 0
    }
  },
  computed: {
    ...mapState({
      logo: 'logo',
      motto: 'motto'
    })
  },
  methods: {
    handleSelect: function (index, indexPath) {
      if (indexPath.length === 2) {
        this.$router.push({path: '/', query: {category: index}})
      } else if (index === 'timeline') {
        this.$router.push({path: ('/' + index)})
      } else if (index === 'about') {
        this.$router.push({path: ('/article/5')})
      }
    },
    search (field, data) {
      let query = {}
      query[field] = data
      if (data) {
        this.$router.push({path: '/home', query})
      }
    },
    getImageUrl (originUrl) {
      return getImageUrl(originUrl)
    }
  },
  created: function () {
    let self = this
    window.addEventListener('scroll', function () {
      let yOffset = window.pageYOffset
      if (yOffset > self.pageYOffset) {
        self.show = false
      } else {
        self.show = true
      }
      self.pageYOffset = yOffset
    })
    window.addEventListener('resize', function () {
      console.log(1)
      if (document.body.clientWidth > 860) {
        self.typeChoice = 0
      } else {
        self.typeChoice = 1
      }
    })
  }
}
</script>

<style scoped lang="less">
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 100;
    .full-hd {
      background-color: #2c3e50;
      .el-col {
        background-color: #2c3e50;
      }
      .el-col:last-child {
        ul {
          margin-right: 20px;
          display: flex;
          justify-content: flex-end;
        }
      }
      .logo-container {
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          padding: 5px 0;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          /*line-height: 60px;*/
          color: #fff;
          font-size: .85rem;
        }
      }
      .el-menu--horizontal {
        border: none;
      }
    }
    .brief-hd {
      background-color: #2c3e50;
      .el-col:first-child {
        text-align: left;
        i {
          margin-left: 15px;
          color: white;
          font-size: 1.5rem;
        }
      }
      .el-col:nth-child(2) {
        img {
          width: 50px;
          height: 50px;
          padding: 5px 0;
          border-radius: 50%;
          vertical-align:middle;
        }
        span {
          color: white;
          font-size: .85rem;
          vertical-align:middle;
        }
      }
      .el-col:last-child {
        text-align: right;
        i {
          margin-right: 15px;
          font-size: 1.5rem;
          color: white;
        }
      }
    }
  }
</style>
