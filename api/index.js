require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')

const JWT_SECRET = process.env.JWT_SECRET

const app = express()
app.use( // JWT middleware
  // jwt({ secret: JWT_SECRET }).unless({
  //   path: [
  //     // { url: '/api/auth/login' }, 
  //     { url: /\/api\/\v1\/sheets\/*/ } // disable on the sheets URLs, which use the keys that the user provides
  //   ]
  // })
  jwt({ secret: JWT_SECRET }).unless((req) => {
    let { path } = req
    console.log('path', path)
    if (path === '/api/auth/login' || path === '/auth/login') return true
    else if (path.indexOf('/v1/sheets/') === 0) return true
    else return false
  })
)
app.use(cookieParser())
app.use(bodyParser.json())

// Require API routes
const auth = require('./routes/auth')
// const google = require('./routes/g')
const sheets = require('./routes/sheets')

// Import API Routes
app.use(auth)
app.use(sheets)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
