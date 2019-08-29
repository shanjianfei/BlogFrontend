<template>
  <el-row class="header"
          style="height: 35px">
    <el-col class="header-left"
            :span="12">
      <i class="el-icon-document"></i>
      <span class="title-zh">{{titleZh}}</span>
      <span class="vertical-line"></span>
      <span class="title-en">{{titleEn}}</span>
      <span class="view-more"
            v-if="viewMore">
        <router-link :to="viewMore.routeName">{{viewMore.text}}</router-link>
      </span>
    </el-col>
    <el-col class="header-right"
            :span="12">
      <ul>
        <li v-for="(menu, index) in menus"
            :key="index"
            @click="handleSelect(menu)">
          <el-link :type="menu.selected?'primary':'info'">{{menu.subMenu}}</el-link>
        </li>
        <li>
          <i class="el-icon-refresh-right"
             @click="refresh"></i>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    titleZh: '',
    titleEn: '',
    viewMore: {
      Type: Object,
      default: undefined
    },
    menus: {
      Type: Object,
      default: {}
    }
  },
  methods: {
    handleSelect (menu) {
      this.selected = menu.name
      this.$emit('handleSelectMenu', menu.name)
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.header {
  &-left {
    text-align: left;
    .el-icon-document {
      .fontS(1.5rem);
      .margin(right, 5px);
      .fontC(@common-yellow);
    }

    .title-zh,
    .title-en {
      .fontS(1.5rem);
      .fontW(500);
    }

    .title-zh {
      .fontW(500);
    }

    .view-more {
      .margin(left, 8px);
      a {
        .fontS(0.8rem);
        .fontC(@common-blue);
        text-decoration: none;
      }
    }

    .vertical-line {
      .displayI;
      .h(25px);
      .margin(0, 5px);
      border-right: 1px solid @base-black;
    }
  }
  &-right {
    text-align: right;
    ul {
      li {
        .margin(right, 10px);
        // .h(2rem);
        line-height: 35px;
        .displayI;
        cursor: pointer;
      }
    }
  }
}
</style>
