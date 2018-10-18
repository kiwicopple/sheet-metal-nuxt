<template>
<div class="TokenCard box">

  <div class="field has-addons"> 
    <p class="control is-expanded has-icons-left">
      <input class="input" ref="tokenKey" :value="tokenKey" readonly/>
      <span class="icon is-small is-left"><i class="fas fa-key"></i></span>
    </p>
    <p class="control">
      <a class="button is-dark is-outlined" @click="copyKey()">
        <span class="icon is-small"><i class="fas fa-copy"></i></span>
      </a>
    </p>
  </div>

  <div class="buttons">
    <a class="button is-small is-rounded">Delete</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'TokenCard',
  props: {
    tokenKey: { type: String, required: true }
  },
  computed: {
  },
  methods: {
    copyKey () {
      this.$refs.tokenKey.focus()
      this.$refs.tokenKey.select()
      try {
        var successful = document.execCommand('copy');
        if (successful) this.$toast.show('Copied!', { duration: 2000 })
        else this.$toast.error('Oops, unable to copy', { duration: 2000 })
      } catch (err) {
        this.$toast.error('Oops, unable to copy', { duration: 2000 })
      }
    }
  }
}
</script>

<style>
</style>
