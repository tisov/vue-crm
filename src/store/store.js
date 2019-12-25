import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import userInfo from './userInfo'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    // fetch currency
    async fetchCurrency() {
      let key = process.env.VUE_APP_FIXER
      let res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=EUR,USD,RUB,KZT`)
      return await res.json()
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    userInfo,
    category,
    record
  }
})
