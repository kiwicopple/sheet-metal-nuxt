export const state = () => ({
  isLoggedIn: false,
  sheets: []
})

export const mutations = {
  setLoggedIn (state, payload) {
    console.log('setLoggedIn', payload)
    state.isLoggedIn = payload
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  sheets: state => state.sheets,
  token: state => state.token
}
