const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/* Create a JWT token for this user to manage their account. */
router.post('/auth/login', function (req, res) {
  const { user, token } = req.body
  const accessToken = jsonwebtoken.sign({ profile: user, googleAuth: token }, JWT_SECRET)
  saveUser(user)
  saveToken(token)
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
  let user = { req }
  let sheets = getSheets(user.id)
  return res.json(sheets)
})

/* GET all the files that this user has saved in the past. */
router.post('/auth/sheets/add', function (req, res) {
  const payload = req.body
  let sheetId = saveSheet(payload)
  return res.json(sheetId)
})

module.exports = router

//
// mocking out an API calls to Pollygot Core
//
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(process.env.LOCAL_DATA_STORE)
const db = low(adapter)

const getSheet = (id) => { // eslint-disable-line
  let sheets = db.get('sheets').value()
  return sheets.find(x => (x.id === id)) || null
}
const getSheets = (userId) => { // eslint-disable-line
  let sheets = db.get('sheets').value()
  return sheets.find(x => (x.user_id === userId)) || []
}
const getToken = (id) => { // eslint-disable-line
  let tokens = db.get('tokens').value()
  return tokens.find(x => (x.id === id)) || null
}
const getTokens = (userId) => { // eslint-disable-line
  let sheets = db.get('tokens').value()
  return sheets.find(x => (x.user_id === userId)) || null
}
const getUser = (id) => { // eslint-disable-line
  let users = db.get('users').value()
  return users.find(x => (x.id === id)) || null
}
const saveSheet = (sheet, userId) => { // eslint-disable-line
  return db.get('sheet').push({ ...sheet, user_id: userId }).write().id
}
const saveToken = (token, userId) => { // eslint-disable-line
  return db.get('tokens').push({ ...token, user_id: userId }).write().id
}
const saveUser = (user, userId) => { // eslint-disable-line
  return db.get('users').push({ ...user, user_id: userId }).write().id
}
