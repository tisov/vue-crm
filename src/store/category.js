import fb from 'firebase/app'

export default {
  actions: {
    // CREATE Category
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        let uid = await dispatch('getUid')
        let res = await fb.database().ref(`/users/${uid}/categories`).push({
          title,
          limit
        })
        return { title, limit, catId: res.key }
      } catch (err) {
        commit('setError')
        throw err
      }
    },
    // GET Categories
    async fetchCategories({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUid')
        let res = (await fb.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(res).map(key => ({ ...res[key], catId: key }))
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // UPDATE Categories
    async updateCategory({ dispatch, commit }, { catId, title, limit }) {
      try {
        let uid = await dispatch('getUid')
        await fb.database().ref(`/users/${uid}/categories`).child(catId).update({ title, limit })
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // FETCH Category By Id
    async fetchCategoryById({ dispatch, commit }, catId) {
      try {
        let uid = await dispatch('getUid')
        let res = (await fb.database().ref(`/users/${uid}/categories`).child(catId).once('value')).val() || {}
        return { ...res, catId }
      } catch (err) {
        commit('setError', err)
        throw err
      }
    }
  }
}