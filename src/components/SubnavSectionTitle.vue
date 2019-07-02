<template>
  <div class="subnav-section-title">
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'SubnavSectionTitle',
  props: ['title']
}
</script>

<style scoped lang="less">
  @import '~@/style/mixin.less';
  @import '~@/style/base.less';
  .subnav-section-title {
    .flexV;
    text-align: left;
    .h(2rem);
    .fontS(1.2rem);
    border-left: 5px solid @common-blue;
  }
</style>
