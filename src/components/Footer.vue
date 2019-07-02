<template>
    <div class="footer-container">
      <div class="footer-content">
        <span class="filing" v-if="filing">{{filing}}</span>
        <el-divider direction="vertical" v-if="filing"></el-divider>
        <span class="copyright" v-if="copyright">copyright&copy;{{copyright}}</span>
        <el-divider direction="vertical" v-if="copyright"></el-divider>
        <span v-if="urlOsl">
          非商业用途请遵循
          <el-link :href="urlOsl" target="_blank" type="primary">{{openSourceLicense}}</el-link>
        </span>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
let newVar = {
  name: 'Footer',
  computed: {
    ...mapState({
      filing: 'filing',
      copyright: 'copyright',
      openSourceLicense: 'open_source_license',
      urlOsl: 'url_osl'
    })
  }
}
export default newVar
</script>

<style scoped lang="less">
  @import '~@/style/mixin';
  .footer-container {
    height: 45px;
    .flexH;
    .flexV;
    border-top: 1px solid #ddd;
    .fontS(.9rem);
    box-sizing: border-box;
  }
</style>
