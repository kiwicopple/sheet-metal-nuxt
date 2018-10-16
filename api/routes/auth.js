const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')
const Database = require('../../db/database')

const JWT_SECRET = process.env.JWT_SECRET

/* Create a JWT token for this user to manage their account. */
router.post('/auth/login', function (req, res) {
  const { user, token } = req.body
  const authToken = {
    ...token,
    client_id: process.env.CLIENT_ID
  }
  const dbUser = { ...user, google_token: authToken }
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

// Get all metal tokens for this user
router.get('/auth/tokens/', async function (req, res) {
  try {
    let tokens = await Database.getTokens(req.user.id)
    return res.json(tokens)
  } catch (error) {
    console.log('error', error)
    return res.error(error)
  }
})

// Save a Metal token
router.post('/auth/tokens/', async function (req, res) {
  try {
    let id = await Database.saveToken(Database.uuidv4(), req.user.id)
    return res.json(id)
  } catch (error) {
    console.log('error', error)
    return res.error(error)
  }
})

module.exports = router
