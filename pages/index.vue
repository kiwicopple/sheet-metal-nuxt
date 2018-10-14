<template>
<div class="">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a class="navbar-burger burger" @click="toggleMenu()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">

      <div class="navbar-end">
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
  <section class="container">
    <h1 class="title"> USERS </h1>
  </section>
</div>
</template>

<script>
export default {
  async asyncData () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuActive = !this.isMenuActive
    }
  },

  // Display config
  layout: 'brochure',
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style lang="scss">
</style>
