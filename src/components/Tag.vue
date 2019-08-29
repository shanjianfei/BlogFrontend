<template>
  <ul>
    <li v-for="(item, index) in article.tags"
        :key="index">
      <el-tag size="mini"
              :style="{'color': item.color, 'border': '1px solid ' + item.color}">
        {{item.label}}
      </el-tag>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    tag: {
      type: Object
    }
  }
}
</script>
