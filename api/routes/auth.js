const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')
const Database = require('../lib/database')

const JWT_SECRET = process.env.JWT_SECRET

/* Create a JWT token for this user to manage their account. */
router.post('/auth/login', function (req, res) {
  const { user, token } = req.body
  const dbUser = { ...user, google_token: token }
  const accessToken = jsonwebtoken.sign(dbUser, JWT_SECRET)
  Database.saveUser(dbUser)
  return res.json({
    accessToken
  })
})

/* GET logged in user. */
router.get('/auth/user', function (req, res) {
  return res.json(req.user) // the user and their google token
})

/* GET all the files that this user has saved in the past. */
router.get('/auth/sheets', function (req, res) {
  let sheets = Database.getSheets(req.user.id)
  return res.json(sheets)
})

// Get all metal tokens for this user
router.get('/auth/tokens/', function (req, res) {
  let tokens = Database.getTokens(req.user.id)
  return res.json(tokens)
})

// Save a Metal token
router.post('/auth/tokens/', function (req, res) {
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  let payload = {
    id: uuidv4(),
    created: new Date()
  }
  let id = Database.saveToken(payload, req.user.id)
  return res.json(id)
})

module.exports = router
