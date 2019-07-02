import {getArticleList} from '@/api/api'

const state = {
  articles: [], // 显示在首页的文章
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
    console.log(status, text)
    state.showMore.status = !!status
    state.showMore.text = text || state.showMore.text
    console.log(state.showMore)
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
  }
}

const actions = {
  getArticleList ({commit}, {params, reset}) {
    getArticleList(params).then(function (data) {
      if (reset) {
        commit('reset')
      }
      commit('updateLoading', false)
      commit('updateArticleList', data)
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
