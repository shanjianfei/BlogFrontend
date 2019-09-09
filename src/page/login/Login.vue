<template>
  <div class="login-page">
    <div class="username">
      <el-input placeholder="请输入用户名" v-model="username">
        <template slot="prepend"
          ><i class="el-icon-user-solid"></i
        ></template>
      </el-input>
    </div>
    <div class="password">
      <el-input placeholder="请输入密码" v-model="password" show-password>
        <template slot="prepend"
          ><i class="el-icon-key"></i
        ></template>
      </el-input>
    </div>
    <el-row class="submit" type="flex" justify="space-between">
      <el-button class="register-btn" @click="register" :disabled="registerBtn"
        >注册</el-button
      >
      <el-button
        class="login-btn"
        type="primary"
        @click="login"
        :disabled="loginBtn"
        >登录</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: '',
      loginBtn: false,
      registerBtn: false,
      fromUrl: ''
    }
  },
  methods: {
    ...mapActions('userModule', [
      'userLogin'
    ]),
    ...mapActions('userRegister', [
      'userRegister'
    ]),
    register () {
      this.loginBtn = true
      this.registerBtn = true
      this.userRegister(
        {
          username: this.username,
          password: this.password,
          self: this
        }
      )
    },
    login () {
      this.loginBtn = true
      this.registerBtn = true
      this.userLogin({
        username: this.username,
        password: this.password,
        self: this
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromUrl = from
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
@import "~@/style/base.less";
.login-page {
  position: absolute;
  top: 100px;
  left: 50%;
  width: 300px;
  margin-left: -150px;
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
