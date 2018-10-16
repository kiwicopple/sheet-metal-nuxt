const { Router } = require('express')
const { google } = require('googleapis')
const Database = require('../../db/database')
const Sentry = require('@sentry/node')
Sentry.init({ dsn: process.env.SENTRY_DSN })
const router = Router()

const TOKEN_ERROR = `Missing or invalid metal-token. Make sure the you have 'metal-key' in your headers or 'key' in your query params. Also make sure the key is correct!`

/* GET a sheet. */
router.get('/v1/sheets/:id', async function (req, res) {
  const { id } = req.params
  const auth = await _getAuthFromHeaders(req.headers, req.query)
  console.log('auth', auth)
  if (!auth) return res.status(401).send(TOKEN_ERROR)
  const sheets = _authorisedClient(auth)
  sheets.spreadsheets.get({
    spreadsheetId: id
  }, (err, response) => {
    if (err) return _handleGoogleError(err, req, res)
    let data = response.data
    return res.send(data)
  })
})

/* GET a range of values. */
router.get('/v1/sheets/:id/:range', async function (req, res) {
  const { id, range } = req.params
  const { format } = req.query
  const auth = await _getAuthFromHeaders(req.headers, req.query)
  console.log('auth', auth)
  if (!auth) return res.status(401).send(TOKEN_ERROR)
  const sheets = _authorisedClient(auth)
  sheets.spreadsheets.values.get({
    spreadsheetId: id, range: range,
  }, (err, response) => {
    console.log('possibly new credentials', sheets['_options'].auth.credentials)
    if (err) return _handleGoogleError(err, req, res)
    else if (format && format.toUpperCase() === 'RAW') return res.send(response.data)
    else {
      let data = response.data
      let formatted = _valuesToJson(data.values)
      return res.send({ ...data, values: formatted })
    }
  })
})

module.exports = router

/**
 * Helpers/private to be refactored
 */

// Probably the most annoying part of the whole google library is figuring out refreshed tokens
// https://github.com/googleapis/google-api-nodejs-client/pull/235 and
// https://github.com/googleapis/google-api-nodejs-client/issues/783
// helped a lot
const _authorisedClient = (googleAuth) => {
  const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.OAUTH_REDIRECT_URL)
  oauth2Client.setCredentials({ ...googleAuth })
  return google.sheets({ version: 'v4', auth: oauth2Client })
}

const _handleGoogleError = (error, req, res) => {
  let err = error.response.data
  console.log('error', err)
  Sentry.captureException(err)
  return res.status(500).send(err)
}

const _getAuthFromHeaders = async (headers, query) => {
  try {
    const key = query ? query.key : null
    const googleToken = headers['google-token'] ? JSON.parse(headers['google-token']) : null
    const metalKey = headers['metal-key'] || null
    if (googleToken) { // no need to look up the token, just use the one provided
      console.log('googleToken', googleToken)
      return googleToken
    } else if (metalKey || key) { // API is being called externally, they should be passing a 'metal-key'
      let apiKey = metalKey || key
      let user = await Database.getUserForKey(apiKey) || null
      return (user && user['user_data']) ? user['user_data']['google_token'] : null
    } else {
      console.log('no auth')
      return null
    }
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
    return null
  }
}

const _valuesToJson = (arrayValues) => {
  let headers = arrayValues[0]
  let values = arrayValues.slice(1)
  return values
    .map((val) => { // turn the array into an object, @todo: switch to `reduce`
      let o = {}
      for (var i = 0; i < headers.length; i++) {
        let header = headers[i]
        o[`${header}`] = val[i]
      }
      return o
    })
}
