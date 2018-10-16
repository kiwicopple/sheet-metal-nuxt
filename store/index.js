import Vue from 'vue'

const INITIAL_STATE = {
  isLoggedIn: false,
  profile: {},
  tokens: []
}

export const state = () => (INITIAL_STATE)

/**
 * Actions
 */
export const actions = {
  async nuxtServerInit({ commit }, { app, req, route }) {
    const token = app.$cookies.get('token')
    if (token) { // logged in
      app.$axios.setToken(token, 'Bearer')
      let { data: authUser } = await app.$axios.get('/api/auth/user')
      let { data: tokens } = await app.$axios.get('/api/auth/tokens')
      commit('setLoggedIn')
      commit('setProfile', authUser)
      commit('setTokenList', tokens)

    } 
  }
}

/**
 * Mutations
 */
export const mutations = {
  addToken (state, payload) {
    
  },
  setLoggedIn(state, payload) {
    state.isLoggedIn = true
    if (payload) {
      console.log('payload', payload)
      state.profile = payload.profile
      state.jwt = payload.jwt
      this.$cookies.set('token', JSON.stringify(payload.jwt), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 52
      })
    }
  },
  setLoggedOut (state) {
    for(let f in state) {
      Vue.set(state, f, INITIAL_STATE[f])
    }
    this.$cookies.removeAll()
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setTokenList (state, payload) {
    state.tokens = payload
  }
}

/**
 * Getters
 */
export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  profile: state => state.profile,
  tokens: state => state.tokens
}
