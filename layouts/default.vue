<template>
  <div>
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
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Sheets
            </a>
            <div class="navbar-dropdown">
              <nuxt-link tag="a" :to="{ path: '/' }" class="navbar-item" v-for="sheet in sheets" :key="sheet.id">
                {{sheet.id}}
              </nuxt-link>
              <hr class="navbar-divider">
              <nuxt-link tag="a" :to="{ path: '/account' }" class="navbar-item" v-for="sheet in sheets" :key="sheet.id">
                Link new sheet
              </nuxt-link>
            </div>
          </div>
          <a class="navbar-item">
            Tabs in current sheet
          </a>
        </div>
        <div class="navbar-end">
          <a class="navbar-item">Documentation</a>
          <nuxt-link type="a" :to="{ path: '/account' }" class="navbar-item">Settings</nuxt-link>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isMenuActive: false
    }
  },
  computed: {
    ...mapGetters({
      sheets: 'sheets'
    })
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
