<template>
<div class="Account">
  <div class="top">

    <div class="tabs is-centered">
      <ul>
        <li :class="{'is-active': seletedTab === tab}" v-for="tab in TABS" :key="tab">
          <a @click="seletedTab = tab">
            <span>{{tab}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="container m-t-lg" v-if="!error">

    <div class="columns is-centered  is-multiline" v-if="seletedTab === 'Sheets'">
      <div class="box column is-8">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-fullwidth" type="text" v-model="filter" placeholder="Enter a spreadsheet ID">
          </div>
        </div>
      </div>
      <div v-for="sheet in filteredSheets" :key="sheet.id" class="column is-8" >
        <div class="box">
          {{sheet.id}}
        </div>
      </div>

      <div v-if="filter.length > 0 && !filteredSheets.length" class="column is-8 box">
        <div>
          {{filter}}
        </div>
        <div class="buttons is-right">
          <a class="button">Add</a>
        </div>
      </div>

    </div>

    <div class="columns is-centered"  v-if="seletedTab === 'Account'">
      <div class="column is-8">
        <div class="box">
          Name: {{user.name}}
        </div>
        <div class="buttons is-right">
          <a class="button" @click="logout()">Log out</a>
        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>

const TABS = [ 'Sheets', 'Account' ]

export default {
  asyncData: async function ({ app }) {
    try {
      let { data: authUser } = await app.$axios.get('/api/auth/user')
      let { data: sheets } = await app.$axios.get('/api/auth/sheets')
      console.log('sheets', sheets)
      return {
        error: null,
        filter: '',
        sheets: sheets || [],
        seletedTab: TABS[0],
        user: (authUser) ? authUser.profile : {},

        // expose constants
        TABS: TABS
      }
    } catch (error) {
      console.log('error', error)
      return {
        error: error
      }
    }
  },
  computed: {
    filteredSheets () {
      if (this.filter && this.filter.length) return this.sheets.filter(x => (x.id.indexOf(this.filter) >= 0))
      else return this.sheets
    }
  },
  methods: {
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