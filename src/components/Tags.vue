<template>
  <div class="tags-module">
    <div class="tags-title">
      <span>标签墙</span>
    </div>
    <div class="tags-container">
      <el-tag
        class="article-tag"
        v-for="(item, index) in tags"
        :key="index"
        :style="{'color': item.color, 'border-color': item.color, 'background-color': '#fff'}"
        @click="handleSelectTag(item.label)">
        {{item.label}} [{{item.article_count}}]
      </el-tag>
    </div>
  </div>
</template>

<script>
import {getTagList} from '@/api/api'
export default {
  name: 'Tags',
  data () {
    return {
      tags: []
    }
  },
  created: function () {
    this.getTagList()
  },
  methods: {
    getTagList () {
      let self = this
      getTagList()
        .then(function (data) {
          self.tags = data
        })
    },
    handleSelectTag (tag) {
      this.$router.push({path: '/', query: {tag: tag}})
    }
  }
}
</script>

<style scoped lang="less">
  .tags-module {
    margin: 20px 30px;
    text-align: left;
    .tags-title {
      height: 2rem;
      font-size: 1.5rem;
      border-left: 5px solid #409EFF;
      span {
        margin-left: 10px;
      }
    }
    .tags-container {
      margin: 20px 0;
      .article-tag {
        margin: 10px 3px;
        cursor: pointer;
      }
    }
  }
</style>
