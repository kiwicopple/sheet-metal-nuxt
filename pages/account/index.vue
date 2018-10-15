<template>
<div class="Account" v-if="!error">

  <div class="container m-t-lg">

    <!-- <div class="columns is-centered  is-multiline" v-if="seletedTab === 'Sheets'">
      <div class="box column is-8">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-fullwidth" type="text" v-model="filter" placeholder="Enter a spreadsheet ID">
          </div>
        </div>
      </div>
      <div v-for="sheet in filteredSheets" :key="sheet.id" class="box column is-8" >
        {{sheet.id}}
      </div>

      <div v-if="filter.length > 0 && !filteredSheets.length" class="column is-8 box">
        <div>
          {{filter}}
        </div>
        <div class="buttons is-right">
          <a class="button" @click="addSheet(filter)">Add</a>
        </div>
      </div>

    </div> -->

    <div class="columns is-centered" >
      <div class="column is-8">
        <h3 class="title is-3">Profile</h3>
        <div class="box">
          Name: {{user.name}}
        </div>
        <div class="buttons is-right">
          <a class="button" @click="logout()">Log out</a>
        </div>
        <h3 class="title is-3">API Tokens</h3>
        <p class="subtitle is-size-6">Create a token that you can use with the Metal API</p>
        <div class="buttons is-right">
          <a class="button" @click="createToken()">Create token</a>
        </div>
      <div v-for="token in tokens" :key="token.id" class="box" >
        <div class=""><strong>Key:</strong> {{token.key}}</div>
        <div class="buttons is-right">
          <a class="button is-small">Delete</a>
          <a class="button is-small">Copy Key</a>
        </div>
      </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
const TABS = [ 'Sheets', 'Account' ]
export default {
  asyncData: async function ({ app }) {
    try {
      let { data: authUser } = await app.$axios.get('/api/auth/user')
      let { data: tokens } = await app.$axios.get('/api/auth/tokens')
      // let HEADERS = { headers: { 'google-token': JSON.stringify(authUser['google_token']) } }
      // let { data: sheet } = await app.$axios.get('/api/v1/sheets/1d5GMrITfiuHBkqZQmmfoT_K8j8i0zL-0hDz2WOgpIFE', HEADERS)
      // let { data: values } = await app.$axios.get('/api/v1/sheets/1d5GMrITfiuHBkqZQmmfoT_K8j8i0zL-0hDz2WOgpIFE/Payslips!A1:B5', HEADERS)
      // console.log('sheet', sheet)
      // console.log('values', values)
      console.log('tokens', tokens)
      return {
        error: null,
        filter: '',
        tokens: tokens || [],
        user: (authUser) ? authUser : {},

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
  // this is a hack - need to figure out how to add the cookie in the router so 
  // that I don't have to do this on every page. 
  // Probably populate the store wiht 'logged in user'
  mounted () { 
    const token = this.$cookies.get('token')
    this.$axios.setToken(token, 'Bearer') // All requests should also include the JWT token
  },
  computed: {
    ...mapGetters({
      sheets: 'sheets'
    }),
    filteredSheets () {
      if (this.filter && this.filter.length) return this.sheets.filter(x => (x.id.indexOf(this.filter) >= 0))
      else return this.sheets
    }
  },
  methods: {
    createToken: async function () {
      let { data: token } = await this.$axios.post('/api/auth/tokens')
      console.log('token', token)
    },
    logout () {
      this.$cookies.set('token', false)
      this.$router.push({ path: '/' })
    }
  },

  // Display config
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