<template>
  <div class="category">
    <div class="level level1" v-show="categoryControl.level1.show">
      <span class="level-title">一级:</span>
      <ul class="level-items">
        <li
          class="level-item"
          :class="{ active: categoryControl.level1.selected === '' }"
          @click="select('level1', '')"
        >
          <el-link :underline="false">全部</el-link>
        </li>
        <li
          class="level-item"
          :class="{ active: categoryControl.level1.selected === 'article' }"
          @click="select('level1', 'article')"
        >
          <el-link :underline="false">文章</el-link>
        </li>
      </ul>
    </div>
    <div class="level level2" v-show="categoryControl.level2.show">
      <span class="level-title">二级:</span>
      <ul class="level-items">
        <li
          class="level-item"
          :class="{ active: categoryControl.level2.selected === '' }"
          @click="select('level2', '')"
        >
          <el-link :underline="false">全部</el-link>
        </li>
        <li
          class="level-item"
          :class="
            categoryControl.level2.selected === val.index
              ? 'active'
              : 'inactive'
          "
          v-for="(val, index) in subCategory"
          :key="index"
          @click="select('level2', val.index)"
        >
          <el-link :underline="false">{{ val.name }}</el-link>
        </li>
      </ul>
    </div>

    <div class="level level3" v-show="categoryControl.level3.show">
      <span class="level-title">三级:</span>
      <ul class="level-items">
        <li
          class="level-item"
          :class="{ active: categoryControl.level3.selected === '' }"
          @click="select('level3', '')"
        >
          <el-link :underline="false">全部</el-link>
        </li>
        <li
          class="level-item"
          :class="
            categoryControl.level3.selected === val.index
              ? 'active'
              : 'inactive'
          "
          v-for="(val, index) in subSubCategory"
          :key="index"
          @click="select('level3', val.index)"
        >
          <el-link :underline="false">{{ val.name }}</el-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getCategory } from '@/api/api'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      baseCategory: undefined, // 一级
      subCategory: [], // 二级
      subSubCategory: [], // 三级
      categoryControl: {
        level1: { show: true, selected: '' },
        level2: { show: false, selected: '' },
        level3: { show: false, selected: '' }
      }
    }
  },
  computed: {
    ...mapState('articleContentModule', ['categorylevel1', 'categorylevel2'])
  },
  methods: {
    ...mapActions('articleList', ['getArticleList', 'showLoading']),
    ...mapMutations('articleContentModule', ['setCategorylevel1', 'setCategorylevel2']),
    getCategory (index) {
      let self = this
      getCategory(index).then(function (response) {
        self.subCategory = response[0].sub_category
        if (self.categorylevel1) {
          self.categoryControl.level1.selected = 'article'
          self.categoryControl.level2.selected = self.categorylevel1
          self.categoryControl.level2.show = true
          self.categoryControl.level3.show = true
          for (let i in self.subCategory) {
            if (self.subCategory[i].index === self.categorylevel1) {
              self.subSubCategory = self.subCategory[i]['sub_categorylevel']
            }
          }
        }
        if (self.categorylevel2) {
          self.categoryControl.level3.selected = self.categorylevel2
          self.categoryControl.level3.show = true
        }
        let params = {}
        if (self.categorylevel2 || self.categorylevel1) {
          params = {
            index: self.categorylevel2 || self.categorylevel1
          }
        }
        self.getArticleList({ params, reset: true })
      })
    },
    select (level, val) {
      let params = {}
      this.categoryControl[level]['selected'] = val
      if (level === 'level1') {
        if (val !== '') {
          this.categoryControl.level2.show = true
        } else {
          this.categoryControl.level2.show = false
        }
        this.categoryControl.level2.selected = ''
        this.categoryControl.level3.show = false
        this.categoryControl.level3.selected = ''
      } else if (level === 'level2') {
        if (val !== '') {
          for (let i in this.subCategory) {
            if (this.subCategory[i].index === val) {
              this.subSubCategory = this.subCategory[i]['sub_categorylevel']
            }
          }
          params = {
            index: val
          }
          this.categoryControl.level3.show = true
        } else {
          this.categoryControl.level3.show = false
        }

        this.categoryControl.level3.selected = ''
      } else if (level === 'level3') {
        if (val) {
          params = {
            index: val
          }
        } else {
          params = {
            index: this.categoryControl['level2'].selected
          }
        }
      }
      this.getArticleList({ params, reset: true })
    }
  },
  created () {
    this.setCategorylevel1(this.$route.params.categorylevel1)
    this.setCategorylevel2(this.$route.params.categorylevel2)
    let index = this.$route.path.split('/')[1]
    this.baseCategory = index
    this.getCategory(index)
  }
}
</script>
<style scoped lang="less">
@import "~@/style/mixin";
@import "~@/style/base";
.active {
  .bgc(@common-gray);
  border-radius: 3px;
  .el-link--default {
    .fontC(@base-white);
  }
}
.category {
  text-align: left;
  .level {
    .level-title {
      .fontS(17px);
      .fontW(700);
    }
    .margin(top, 15px);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .level-items {
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      .level-item {
        margin-left: 5px;
        padding: 5px;
      }
    }
  }
}
</style>
