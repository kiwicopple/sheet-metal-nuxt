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
          <!-- <a class="navbar-item">Pricing</a> -->
          <a class="navbar-item">Documentation</a>
          <div class="navbar-item">
            <div class="buttons" v-if="!isLoggedIn">
              <a :href="authUrl" class="button is-primary"><strong>Sign up</strong></a>
              <a :href="authUrl" class="button">Log in</a>
            </div>
            <div class="buttons" v-if="isLoggedIn">
              <nuxt-link :to="{ path: '/account' }" class="button">Account</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const GOOGLE_OATH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile', // this comes anyway
  'https://www.googleapis.com/auth/userinfo.email', // not strictly required, but I want to give users an ability to receive updates via email
  'https://www.googleapis.com/auth/spreadsheets', // CRUD
  'https://www.googleapis.com/auth/drive' // Get a list of sheets (allow the user to "favourite" some), and in the future subscribe to updates
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
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    authUrl () {
      let scope = encodeURIComponent(SCOPES.join(' '))
      let redirect = encodeURIComponent(REDIRECT_URL)
      return `${GOOGLE_OATH_URL}?scope=${scope}` +
        `&access_type=offline` +
        `&include_granted_scopes=true` +
        `&state=${STATE}` +
        `&redirect_uri=${redirect}` +
        `&response_type=code` +
        `&prompt=consent` +
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
