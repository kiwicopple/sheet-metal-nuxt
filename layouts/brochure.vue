<template>
  <div class="BrochureLayout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ path: '/' }" class="navbar-item"><strong>Sheet Metal</strong></nuxt-link>
        <a class="navbar-burger burger" @click="toggleMenu()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">

        <div class="navbar-end">
          <a class="navbar-item">Pricing</a>
          <a class="navbar-item">Documentation</a>
          <div class="navbar-item">
            <div class="buttons">
              <a :href="authUrl" class="button is-primary"><strong>Sign up</strong></a>
              <nuxt-link :to="{ path: '/account' }" class="button is-light">Log in</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
const GOOGLE_OATH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
// const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/spreadsheets'
]
const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URL = process.env.OAUTH_REDIRECT_URL
const STATE = 'state_parameter_passthrough_value'

export default {
  data () {
    return {
      isMenuActive: false
    }
  },
  computed: {
    authUrl () {
      let scope = encodeURIComponent(SCOPES.join(' '))
      let redirect = encodeURIComponent(REDIRECT_URL)
      return `${GOOGLE_OATH_URL}?scope=${scope}` +
        `&access_type=offline` +
        `&include_granted_scopes=true` +
        `&state=${STATE}` +
        `&redirect_uri=${redirect}` +
        `&response_type=code` +
        `&client_id=${CLIENT_ID}`
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuActive = !this.isMenuActive
    }
  }
}
</script>

<style>
</style>
