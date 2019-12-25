import fb from 'firebase/app'

export default {
  actions: {
    // sign in
    async signIn({ getters, commit }, { email, password }) {
      try {
        await fb.auth().signInWithEmailAndPassword(email, password)
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // sign out
    async signOut({ commit }) {
      await fb.auth().signOut()
      commit('clearInfo')
    },
    // register
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await fb.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await fb.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    // get user id
    getUid() {
      const user = fb.auth().currentUser
      return user ? user.uid : null
    }
  }
}