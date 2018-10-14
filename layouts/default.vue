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
              <a class="navbar-item">
                Sheet list
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Link new sheet
              </a>
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

export default {
  data () {
    return {
      isMenuActive: false
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
