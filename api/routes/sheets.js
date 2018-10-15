const { Router } = require('express')
const { google } = require('googleapis')
const router = Router()

/* GET a sheet. */
router.get('/v1/sheets/:id', async function (req, res) {
  const { id } = req.params
  const auth = _getAuthFromHeaders(req.headers)
  if (!auth) return res.status(401).send('Missing metal-token')
  const sheets = _authorisedClient(auth)
  sheets.spreadsheets.get({
    spreadsheetId: id
  }, (err, response) => {
    if (err) return _handleError(err, req, res)
    let data = response.data
    // console.log('data', data)
    return res.send(data)
  })
})

/* GET a range of values. */
router.get('/v1/sheets/:id/:range', async function (req, res) {
  const { id, range } = req.params
  const { raw } = req.query
  const auth = _getAuthFromHeaders(req.headers)
  if (!auth) return res.status(401).send('Missing metal-token')
  const sheets = _authorisedClient(auth)
  sheets.spreadsheets.values.get({ 
    spreadsheetId: id, range: range, 
  }, (err, response) => {
    if (err) return _handleError(err, req, res)
    else if (raw) return res.send(response.data)
    else {
      let data = response.data
      let formatted = _valuesToJson(data.values)
      return res.send({ ...data, values: formatted })
    }
  })
})

module.exports = router

//
// Helpers/private to be refactored
//

const _authorisedClient = (googleAuth) => {
  const oAuth2Client = new google.auth.OAuth2()
  oAuth2Client.setCredentials(googleAuth)
  return google.sheets({ version: 'v4', auth: oAuth2Client })
}

const _handleError = (error, req, res) => {
  console.log('error', JSON.stringify(error, Object.getOwnPropertyNames(error)))
  return res.status(500).send({ error: 'Error' })
}

const _getAuthFromHeaders = (headers) => {
  const googleToken = headers['google-token'] ? JSON.parse(headers['google-token']) : null
  const metalKey = headers['metal-key'] || null
  if (googleToken) { // no need to look up the token, just use the one provided
    console.log('googleToken', googleToken)
    return googleToken 
  } else if (metalKey) { // API is being called externally, they should be passing a 'metal-key'
    console.log('metalKey', metalKey)
    return null // now get the auth associated to this key
  } else {
    console.log('no auth')
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