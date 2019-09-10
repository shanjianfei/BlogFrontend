import { getRootComments, addComment, giveLikeToCommnet } from '@/api/api'

const state = {
  articleId: undefined,
  rootComments: []
}

const mutations = {
  setArticleId (state, id) {
    state.articleId = id
  },
  setRootComments (state, comments) {
    state.rootComments = comments
  },
  updateRootComments (state, comment) {
    let isRoot = comment['is_root']
    if (isRoot) {
      // 根评论
      state.rootComments.unshift(comment)
    } else {
      let belongRoot = comment['belong_root']
      if (state.rootComments.length > 0) {
        for (let c in state.rootComments) {
          if (state.rootComments[c] === belongRoot) {
            if (!state.rootComments[c].all_sub_comment) {
              state.rootComments.all_sub_comment = []
            }
            state.rootComments.all_sub_comment.unshift(comment)
          }
        }
      }
    }
  }
}

const actions = {
  getComments ({ state, commit }) {
    getRootComments(state.articleId).then(response => {
      commit('setRootComments', response.results)
    })
  },
  submitComment ({ commit }, { postData, self }) {
    addComment(postData)
      .then(function (response) {
        self.$message({
          type: response.result,
          message: response.msg
        })
        if (response.result === 'success') {
          if (postData.is_root) {
            self.commentForm.rootInputValue = ''
          }
          commit('updateRootComments', response.data)
        }
      })
      .catch(function (data) {
        self.$message.error('评论失败')
      })
  },
  postLikeComment ({ state }, { commentId, self }) {
    giveLikeToCommnet(commentId)
      .then(function (response) {
        if (response.result === 'success') {
          for (let i in state.rootComments) {
            if (state.rootComments[i].id === commentId) {
              state.rootComments[i].like += 1
              break
            } else {
              for (let j in state.rootComments[i].all_sub_comment) {
                if (state.rootComments[i].subs[j].id === commentId) {
                  state.rootComments[i].subs[j].like += 1
                  break
                }
              }
            }
          }
        }
        self.$message({
          message: response.msg,
          type: response.result
        })
      })
      .catch(function () {
        self.$message.error('点赞失败')
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
