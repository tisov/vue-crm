import fb from 'firebase/app'

export default {
  actions: {
    // CREATE Record
    async createRecord({ dispatch, commit }, pl) {
      try {
        let uid = await dispatch('getUid')
        let res = await fb.database().ref(`/users/${uid}/records`).push(pl)
        return res
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // FETCH Records
    async fetchRecords({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUid')
        let res = (await fb.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(res).map(key => ({ ...res[key], recId: key }))
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // FETCH Record By Id
    async fetchRecordById({ dispatch, commit }, recId) {
      try {
        let uid = await dispatch('getUid')
        let res = (await fb.database().ref(`/users/${uid}/records`).child(recId).once('value')).val() || {}
        return { ...res, recId }
      } catch (err) {
        commit('setError', err)
        throw err
      }
    }
  }
}