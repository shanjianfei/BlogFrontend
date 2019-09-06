import { register } from '@/api/api'

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
  setUser (state, { userName, token }) {
    localStorage.setItem('currentUser_name', userName)
    localStorage.setItem('currentUser_token', token)
  }
}

const actions = {
  userRegister ({ commit }, { username, password, self }) {
    register({ username, password }).then(function (response) {
      self.$message.success('注册成功')
      self.loginBtn = false
      self.registerBtn = false
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
