export const state = () => ({
  isLoggedIn: false,
  sheets: []
})

export const mutations = {
  setLoggedIn (state, payload) {
    state.isLoggedIn = payload
  },
  setSheetList (state, sheets) {
    state.sheets = sheets
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  sheets: state => state.sheets,
  token: state => state.token
}
