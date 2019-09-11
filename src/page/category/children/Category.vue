<template>
  <div>
    <ul></ul>
  </div>
</template>
<script>
import { getCategory } from '@/api/api'
export default {
  data () {
    return {
      category: undefined
    }
  },
  methods: {
    getCategory (categoryName) {
      let self = this
      getCategory(this.categoryName).then(function (response) {
        self.category = response
      })
    }
  },
  created () {
    let categoryName = this.$route.params.name
    this.getCategory(categoryName)
  }
}
</script>
