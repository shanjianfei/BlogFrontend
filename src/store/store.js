import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store(
  {
    state: {
      logo: '',
      motto: '',
      filing: '',
      copyright: '',
      open_source_license: '',
      url_osl: ''
    },
    mutations: {
      updateSiteInfo: (state, value) => {
        state.logo = value.logo
        state.motto = value.motto
        state.filing = value.filing
        state.copyright = value.copyright
        state.open_source_license = value.open_source_license
        state.url_osl = value.url_osl
      }
    },
    actions: {
      updateSiteInfo ({commit}, siteInfo) {
        commit('updateSiteInfo', siteInfo)
      }
    }
  }
)

export default store
