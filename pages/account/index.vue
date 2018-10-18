<template>
<div class="Account" v-if="!error">

    <div class="hero is-dark is-medium">
      <div class="hero-body columns is-centered" >
        <div class="column is-7">
          <h3 class="title is-3">Welcome {{profile.name}}</h3>
          <p class="subtitle is-size-6">Use your User ID with an API Token to get started.</p>

          <div class="field has-addons"> 
            <p class="control">
              <a class="button is-static">User ID</a>
            </p>
            <p class="control is-expanded">
              <input class="input" ref="userId" :value="profile.id" readonly/>
            </p>
            <p class="control">
              <a class="button is-primary" @click="copyId()"><span class="icon is-small"><i class="fas fa-copy"></i></span></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  <div class="container m-t-lg">


    <div class="columns is-centered" >
      <div class="column is-8">
        <div class="m-t-lg">
          <h3 class="title is-3">API Tokens</h3>
          <p class="subtitle is-size-6">Create a token that you can use with the Metal API</p>
          <div class="buttons is-right">
            <a class="button is-primary has-shadow power-up" @click="createToken()">Create token</a>
          </div>
          <TokenCard :tokenKey="token.key" v-for="token in tokens" :key="token.id" />
        </div>
        <div class="m-t-xxl">
          <h3 class="title is-3">Account</h3>
          <div class="buttons is-right">
            <a class="button" @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TokenCard from '~/components/TokenCard'
const TABS = [ 'Sheets', 'Account' ]
export default {
  asyncData: async function ({ app }) {
    try {
      
      return {
        error: null,
        filter: '',
        // tokens: tokens || [],
        // user: (authUser) ? authUser : {},

        // expose constants
        TABS: TABS
      }
    } catch (error) {
      console.log('error', JSON.stringify(error, Object.getOwnPropertyNames(error)))
      return {
        error: error
      }
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile',
      tokens: 'tokens'
    }),
    filteredSheets () {
      if (this.filter && this.filter.length) return this.sheets.filter(x => (x.id.indexOf(this.filter) >= 0))
      else return this.sheets
    }
  },
  methods: {
    ...mapActions({
      createToken: 'createToken'
    }),
    copyId () {
      this.$refs.userId.focus()
      this.$refs.userId.select()
      try {
        var successful = document.execCommand('copy');
        if (successful) this.$toast.show('Copied!', { duration: 2000 })
        else this.$toast.error('Oops, unable to copy', { duration: 2000 })
      } catch (err) {
        this.$toast.error('Oops, unable to copy', { duration: 2000 })
      }
    },
    logout () {
      this.$cookies.set('token', false)
      this.$router.push({ path: '/' })
    }
  },

  // Display config
  components: { TokenCard },
  head () {
    return {
      title: 'Account'
    }
  }
}
</script>

<style lang="scss">
.Account {
  .top {
    background: #fff;
    border-bottom: 1px solid #dedede;
  }
}
</style>