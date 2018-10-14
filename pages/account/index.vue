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


    <div class="container m-t-lg">
      <div class="columns is-centered ">
        <div class="column is-8 box" v-if="seletedTab === 'Sheets'">
          Sheet list
        </div>
        <div class="column is-8" v-if="seletedTab === 'Account'">
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
    let files = app.$axios.get(`/api/g/sheets`)
    let { data: authUser } = await app.$axios.get('/api/auth/user')
    console.log('files', files)
    return {
      seletedTab: TABS[0],
      user: authUser,

      // expose constants
      TABS: TABS
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