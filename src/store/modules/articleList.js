import {getArticles} from '@/api/api'

const state = {
  articles: [], // 显示在首页的文章
  topArticles: [], // 置顶文章
  nextPage: undefined, // 分页获取的结果
  showTip: false, // 显示没有内容提示
  showMore: { // 显示更多按钮
    status: false,
    text: '加载完毕'
  },
  loading: false // 加载画面
}

const mutations = {
  updateShowMore (state, {status, text}) {
    state.showMore.status = !!status
    state.showMore.text = text || state.showMore.text
  },
  updateLoading (state, show) {
    state.loading = show
  },
  reset (state) {
    state.articles = []
    state.nextPage = undefined
    state.showTip = false
    state.showMore = {
      status: false,
      text: '加载完毕'
    }
  },
  updateArticleList (state, data) {
    if (data.next) {
      state.nextPage = data.next
      state.showMore.status = true
      state.showMore.text = '加载更多'
    } else {
      state.nextPage = undefined
      state.showMore.status = false
      state.showMore.text = '加载完毕'
    }
    if (data.results.length === 0) {
      state.showTip = true
    } else {
      state.showTip = false
    }
    state.articles = state.articles.concat(data.results)
  },
  updateTopArticles (state, data) {
    state.topArticles = data
  }
}

const actions = {
  getArticleList ({commit}, {params, reset}) {
    getArticles(params).then(function (data) {
      if (reset) {
        commit('reset')
      }
      commit('updateLoading', false)
      commit('updateArticleList', data)
    })
  },
  getTopArticles ({commit}) {
    let params = {
      page: 1,
      size: 6,
      istop: 2
    }
    getArticles(params).then(function (data) {
      commit('updateTopArticles', data.results)
    })
  },
  showLoading ({commit}) {
    commit('updateLoading', true)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
