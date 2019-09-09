import { getComments } from '@/api/api'
const state = {
  bolgId: undefined,
  comments: undefined
}

const mutations = {
  setComments (state, { blogId, comments }) {
    state.blogId = blogId
    state.comments = comments
  },
  updateComments (state, {comment}) {
    if (state.comments) {
      state.comments.unshift(comment)
    } else {
      state.comments = [comment]
    }
  }
}

const actions = {
  getComments ({ commit }, { blogId }) {
    getComments(blogId).then(function (response) {
      commit('setComments', { blogId, comments: response.data })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
