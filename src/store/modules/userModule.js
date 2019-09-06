import { login } from '@/api/api'
import router from '@/router'

const state = {
  currentUser: {
    get userName () {
      return localStorage.getItem('currentUser_name')
    },
    get userToken () {
      return localStorage.getItem('currentUser_token')
    }
  }
}

const mutations = {
  setUser: function (state, { username, usertoken }) {
    localStorage.setItem('currentUser_name', username)
    localStorage.setItem('currentUser_token', usertoken)
  }
}

const actions = {
  userLogin ({ commit }, { username, password, self }) {
    login({ username, password })
      .then(function (res) {
        self.loginBtn = false
        self.registerBtn = false
        if ('user_info' in res) {
          let username = res['user_info']['user']
          let usertoken = res['user_info']['token']
          commit('setUser', { username, usertoken })
          router.push(self.fromUrl.path)
        }
      })
      .catch(function () {
        self.loginBtn = false
        self.registerBtn = false
        self.$message.error('用户名或者密码错误')
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
