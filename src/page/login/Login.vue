<template>
  <div class="login-page">
    <div class="username">
      <el-input placeholder="请输入用户名"
                v-model="username">
        <template slot="prepend"><i class="el-icon-user-solid"></i></template>
      </el-input>
    </div>
    <div class="password">
      <el-input placeholder="请输入密码"
                v-model="password"
                show-password>
        <template slot="prepend"><i class="el-icon-key"></i></template>
      </el-input>
    </div>
    <el-row class="submit"
            type="flex"
            justify="space-between">
      <el-button class="register-btn"
                 @click="register">注册</el-button>
      <el-button class="login-btn"
                 type="primary"
                 @click="login">登录</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {

    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.login-page {
  width: 300px;
  margin: 100px auto;
  .password {
    .margin(top, 20px);
  }
  .submit {
    .margin(top, 20px);
    button {
      width: 100%;
    }
  }
}
</style>
