<template>
<div class="TokenCard box">
  <div class="field has-addons"> 
    <p class="control is-expanded has-icons-left">
      <input class="input" ref="tokenKey" :value="tokenKey" readonly/>
      <span class="icon is-small is-left"><i class="fas fa-key"></i></span>
    </p>
    <p class="control">
      <a class="button" @click="copyKey()">
        <span class="icon is-small"><i class="fas fa-trash"></i></span>
      </a>
    </p>
    <p class="control">
      <a class="button" @click="copyKey()">
        <span class="icon is-small"><i class="fas fa-copy"></i></span>
      </a>
    </p>
  </div>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
      <div class="tags has-addons">
        <span class="tag">Tag 1</span><a class="tag is-delete"></a>
      </div>
    </div>
    <div class="control">
      <div class="tags has-addons">
        <span class="tag">Tag 2</span><a class="tag is-delete"></a>
      </div>
    </div>
    <div class="control has-icons-right">
      <input class="input is-small" placeholder="Tag this token" />
    </div>
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
