import { getBlogs } from '@/api/api'

const state = {
  blogs: [],
  nextPage: undefined,
  dateSelect: undefined,
  selected: 'default', // 当前选的过滤条件 default hot lasted date
  showMore: {
    status: false,
    text: '没有更多了'
  }
}

const mutations = {
  reset (state) {
    state.blogs = []
    state.nextPage = undefined
    state.showMore = {
      status: false,
      text: '没有更多了'
    }
  },
  select (state, type) {
    state.selected = type
  },
  updateTimeline (state, data) {
    if (data.next) {
      state.nextPage = data.next
      state.showMore.status = true
      state.showMore.text = '加载更多'
    } else {
      state.nextPage = undefined
      state.showMore.status = false
      state.showMore.text = '加载完毕'
    }
    state.blogs = state.blogs.concat(data.results)
  }
}

const actions = {
  getTimelineInfo ({ commit }, { params, reset }) {
    getBlogs(params).then(function (data) {
      reset = reset || false
      if (reset) {
        commit('reset')
      }
      commit('updateTimeline', data)
    })
  },
  updateSelect ({ commit }, type) {
    commit('select', type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
