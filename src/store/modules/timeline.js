import { getBlogs } from '@/api/api'
import Vue from 'vue'

const state = {
  blogs: {}, // 以年月进行分类 {'2010': {'1': [], '2': []}, '2011': {'1': []}}
  nextPage: undefined,
  dateSelect: undefined,
  selected: 'default', // 当前选的过滤条件 default hot lasted date
  showMore: {
    show: true,
    status: false,
    text: '没有更多了'
  },
  tip: {
    show: false,
    text: '目前还没有东西展示呢~~~'
  }
}

const mutations = {
  reset (state) {
    state.blogs = {}
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
    for (let i in data.results) {
      let blog = data.results[i]
      let createTime = new Date(blog.create_time)
      let year = String(createTime.getFullYear())
      let month = String(createTime.getMonth() + 1)
      if (!(year in state.blogs)) {
        Vue.set(state.blogs, year, {})
        Vue.set(state.blogs[year], month, [blog])
      } else {
        if (!(month in state.blogs[year])) {
          Vue.set(state.blogs[year], month, [blog])
        } else {
          state.blogs[year][month].push(blog)
        }
      }
    }
    if (Object.keys(state.blogs).length === 0) {
      state.showMore.show = false
      state.tip.show = true
    } else {
      state.showMore.show = true
      state.tip.show = false
    }
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
