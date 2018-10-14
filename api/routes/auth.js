const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/* Create a JWT token for this user to manage their account. */
router.post('/auth/login', function (req, res) {
  const { user, token } = req.body
  // @TODO: save the full token

  const accessToken = jsonwebtoken.sign({ profile: user, googleAuth: token }, JWT_SECRET)

  return res.json({
    accessToken
  })
})

/* GET logged in user. */
router.get('/auth/user', function (req, res) {
  return res.json(req.user) // the user and their google token
})

module.exports = router
