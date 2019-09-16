const state = {
  categorylevel1: undefined,
  categorylevel2: undefined
}

const mutations = {
  setCategorylevel1 (state, val) {
    state.categorylevel1 = val
  },
  setCategorylevel2 (state, val) {
    state.categorylevel2 = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
