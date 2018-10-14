<template>
<div class="Home">
  <section class="hero is-primary is-bold is-large">
    <div class="hero-body">
      <h1 class="title is-1">Sheet Metal</h1>

      <p>Token: {{token}}</p>
    </div>
  </section>
</div>
</template>

<script>
const axios = require('axios')
const GOOGLE_TOKEN_URL = `https://www.googleapis.com/oauth2/v4/token`
export default {
  async asyncData ({ app, params, query, store }) {
    let { error, code } = query
    if (error) {
      console.log('error', error)
    } else {
      console.log('code', code)
      let payload = {
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code'
      }
      console.log('payload', payload)
      let { data: token } = await axios.post(GOOGLE_TOKEN_URL, payload).catch(e => {
        console.error('e', e.response.data)
      })
      console.log('token', token)
      // db.get('users').push(token).write()
      // res.redirect('/')
      return {
        token: token
      }
    }
  },

  // Display config
  layout: 'brochure',
  head () {
    return {
      title: 'Auth'
    }
  }
}
</script>

<style lang="scss">
</style>
