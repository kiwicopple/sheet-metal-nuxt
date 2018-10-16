import Vue from 'vue'

const INITIAL_STATE = {
  isLoggedIn: false,
  jwt: {},
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
      commit('setLoggedIn', token)
      commit('setProfile', authUser)
      commit('setTokenList', tokens)

    } 
  },
  async createToken({ commit, state }, payload) {
    try {
      this.$axios.setToken(state.jwt, 'Bearer')
      let { data: token } = await this.$axios.post('/api/auth/tokens')
      commit('addToken', token)
    } catch (error) {
      console.error('error', error)
    }
  },
}

/**
 * Mutations
 */
export const mutations = {
  addToken (state, payload) {
    state.tokens.push(payload)
  },
  setLoggedIn(state, payload) {
    state.isLoggedIn = true
    if (payload) {
      state.jwt = payload
      this.$cookies.set('token', JSON.stringify(payload), {
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
