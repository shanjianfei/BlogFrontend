<template>
  <el-row class="header">
    <el-col class="header-left" :span="12">
      <i class="el-icon-document"></i>
      <span class="title-zh">{{titleZh}}</span>
      <span class="vertical-line"></span>
      <span class="title-en">{{titleEn}}</span>
    </el-col>
    <el-col class="header-right" :span="12">
      <ul>
        <li v-for="(menu, index) in controlMenus"
            :key="index"
            :class="{ active: (menu.selected || selected === menu.name) }"
            @click="handleSelect(menu)">
          <span>{{menu.subMenu}}</span>
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
    menus: {
      Type: Array,
      default: []
    }
  },
  data: function () {
    return {
      controlMenus: this.menus,
      selected: undefined
    }
  },
  methods: {
    handleSelect (menu) {
      this.selected = menu.name
      this.$emit('handleSelectMenu', menu.method)
    }
  }
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .header {
    &-left {
      text-align: left;
      .el-icon-document {
        .fontS(1.5rem);
        .margin(right, 5px);
        .fontC(@common-yellow);
      }

      .title-zh, title-en {
        .fontS(1.5rem);
        .fontW(500);
      }

      .title-zh {
        .fontW(500);
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
        .active {
          border-bottom: 3px solid @common-blue;
        }

        li {
          .margin(right, 10px);
          .h(2rem);
          .displayI;
          cursor: pointer;
          border-bottom: 3px solid #fff;

          span {
            line-height: 2rem;
          }
        }
      }
    }
  }

</style>
