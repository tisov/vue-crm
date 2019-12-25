import fb from 'firebase/app'

export default {
  state: {
    info: {},
    loadingUserInfo: true
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
    setLoadingUserInfo(state) {
      state.loadingUserInfo = true
    },
    clearLoadingUserInfo(state) {
      state.loadingUserInfo = false
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUid')
        let res = await fb.database().ref(`/users/${uid}/info`).once('value')
        let data = await res.val()
        commit('setInfo', data)
      } catch (err) {
        throw err
      }
    },
    // Update info
    async updateInfo({ dispatch, commit, getters }, pl) {
      try {
        let newData = {
          ...getters.info,
          bill: +pl.newBill || getters.info.bill,
          locale: pl.locale || getters.info.locale,
          name: pl.name || getters.info.name
        }

        let uid = await dispatch('getUid')
        await fb.database().ref(`/users/${uid}/info`).update(newData)
        commit('setInfo', newData)
      } catch (err) {
        commit('setError', err)
        throw err
      }
    }
  },
  getters: {
    info: s => s.info,
    loadingUserInfo: s => s.loadingUserInfo
  }
}