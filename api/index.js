require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')

const JWT_SECRET = process.env.JWT_SECRET

const app = express()
app.use( // JWT middleware
  jwt({ secret: JWT_SECRET }).unless({
    path: [
      '/api/auth/login', 
      '/api/v1/sheets'
    ]
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
