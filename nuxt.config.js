require('dotenv').config({
  path: (process.env.NODE_ENV === 'prod') ? '.env.prod' : '.env'
})
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Sheet Metal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sheet Metal. Turn your Google Sheets into a Restful API.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Router
  */
  router: {
    middleware: ['auth']
  },
  /*
  ** Modules
  */
  modules: [
    ['@nuxtjs/dotenv', {
      path: (process.env.NODE_ENV === 'prod') ? '.env.prod' : '.env'
    }],
    ['@nuxtjs/axios', {
      baseURL: process.env.API_URL || 'http://localhost:3000',
    }],
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],
  /*
  ** Global CSS
  */
  css: [
    { src: '@/assets/css/main.scss', lang: 'scss' }
  ],
  /*
  ** Middleware
  */
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
