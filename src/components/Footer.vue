<template>
    <div class="footer-container">
      <div class="footer-content">
        <span class="filing">{{filing}}</span>
        <el-divider direction="vertical" v-if="filing"></el-divider>
        <span class="copyright">copyright&copy;{{copyright}}</span>
        <el-divider direction="vertical" v-if="copyright"></el-divider>
        <span>
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
  .footer-container {
    .footer-content {
      margin-top: 50px;
      padding: 15px 0;
      border-top: 1px solid #ddd;
      font-size: .9rem;
    }
  }
</style>
