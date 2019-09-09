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
}

const actions = {
  userRegister ({ commit }, { username, password, self }) {
    register({ username, password }).then(function (response) {
      self.$message.success(response.msg)
    }).catch(function (error) {
      let status = error.response.status
      if (status === 409) {
        let msg = error.response.data.msg
        self.$message.error(msg)
      }
    }).finally(() => {
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
