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
              <nuxt-link :to="{ path: '/account' }" class="button is-primary"><strong>Sign up</strong></nuxt-link>
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
