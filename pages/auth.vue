<template>
<div class="Home">
  <section class="section is-large has-text-centered" v-if="authError || !user">
    <h1 class="title is-1">Oops</h1>
    <p>{{authError}}</p>
  </section>
  <section class="section is-large has-text-centered" v-if="user && user.name">
    <h3 class="title is-3">Welcome {{user.name}}</h3>
    <a class="button is-dark is-large is-outlined is-rounded" href="/account">Continue to Dashboard</a>
  </section>
</div>
</template>

<script>
const GOOGLE_TOKEN_URL = `https://www.googleapis.com/oauth2/v4/token`
const GOOGLE_USER_URL = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`
const LOGIN_URL = '/api/auth/login'

export default {
  auth: false,
  asyncData: async function ({ app, params, query, store }) {
    try {
      let { error, code } = query
      if (error) throw new Error(error) // no token :( the user probably didn't authorise, or the app isn't set up correctly on Google console
      else { // Google returned a short-lived token
        let payload = { // We can use that token to get a "refresh" token
          code: code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET, 
          redirect_uri: process.env.OAUTH_REDIRECT_URL,
          grant_type: 'authorization_code'
        }
        let { data: token } = await app.$axios.post(GOOGLE_TOKEN_URL, payload) // request the refresh token
        let { data: user } = await app.$axios.get(GOOGLE_USER_URL, { headers: { Authorization: `Bearer ${token.access_token}` } }) // also get the user info
        let { data: jwt } = await app.$axios.post(LOGIN_URL, { token: token, user: user }) // save the user and get a JWT
        app.$cookies.set('token', JSON.stringify(jwt.accessToken), {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 * 52
        })
        store.commit('setLoggedIn', true)
        return {
          authError: null,
          token: token,
          user: user
        }
      }
    } catch (error) {
      console.error('e', error)
      return {
        authError: 'There was a problem signing in.',
        user: null
      }
    }
  },

  // Display config
  layout: 'brochure',
  head () {
    return {
      title: 'Auth'
    }
  }
}
</script>

<style lang="scss">
</style>
