<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Account
    </h1>
  </section>
</template>

<script>
export default {
  async asyncData () {
    return { }
  },
  head () {
    return {
      title: 'Account'
    }
  }
}
</script>
