const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/* Create a JWT token for this user to manage their account. */
router.post('/auth/login', function (req, res, next) {
  const { user } = req.body

  const accessToken = jsonwebtoken.sign(user, JWT_SECRET)

  return res.json({
    accessToken
  })
})

/* GET logged in user. */
router.get('/auth/user', function (req, res) {
  return res.json({ user: req.user })
})

module.exports = router
