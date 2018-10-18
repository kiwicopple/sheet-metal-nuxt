<template>
  <div class="BrochureLayout">
    <nav class="navbar is-transparent" >
      <div class="navbar-brand">
        <nuxt-link :to="{ path: '/' }" class="navbar-item">
          SHEET METAL
        </nuxt-link>
        <a class="navbar-burger burger" @click="toggleMenu()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">

        <div class="navbar-end">
          <!-- <a class="navbar-item">Pricing</a> -->
          <a class="navbar-item" href="https://github.com/kiwicopple/sheet-metal/wiki">Documentation</a>
          <div class="navbar-item">
            <div class="buttons" v-if="!isLoggedIn">
              <a :href="authUrl" class="button is-primary has-shadow"><strong>Sign up</strong></a>
              <a :href="authUrl" class="button">Log in</a>
            </div>
            <div class="buttons" v-if="isLoggedIn">
              <nuxt-link :to="{ path: '/account' }" class="button is-primary has-shadow">Account</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer'

const GOOGLE_OATH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile', // this comes anyway
  'https://www.googleapis.com/auth/userinfo.email', // not strictly required, but I want to give users an ability to receive updates via email
  'https://www.googleapis.com/auth/spreadsheets', // CRUD
  'https://www.googleapis.com/auth/drive', // Get a list of sheets (allow the user to "favourite" some), and in the future subscribe to updates
]

export default {
  components: { Footer },
  data() {
    return {
      isMenuActive: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      googleClientId: 'googleClientId',
      oauthRedirectUrl: 'oauthRedirectUrl',
    }),
    authUrl() {
      let scope = encodeURIComponent(SCOPES.join(' '))
      let redirect = encodeURIComponent(this.oauthRedirectUrl)
      return (
        `${GOOGLE_OATH_URL}?scope=${scope}` +
        `&access_type=offline` +
        `&include_granted_scopes=true` +
        `&state=state_parameter_passthrough_value` +
        `&redirect_uri=${redirect}` +
        `&response_type=code` +
        `&prompt=consent` +
        `&client_id=${this.googleClientId}`
      )
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    },
  },
}
</script>

<style>
</style>
