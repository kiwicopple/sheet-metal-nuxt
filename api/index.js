require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const app = express()

/**
 * Sentry configuration for Express
 */
const Sentry = require('@sentry/node')
Sentry.init({ dsn: process.env.SENTRY_DSN })
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())


const JWT_SECRET = process.env.JWT_SECRET

app.use( // JWT middleware
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
