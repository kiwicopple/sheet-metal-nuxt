const { Router } = require('express')
const router = Router()
const { google } = require('googleapis')

const authorisedSheets = (googleAuth) => {
  const oAuth2Client = new google.auth.OAuth2()
  oAuth2Client.setCredentials(googleAuth)
  return google.sheets({ version: 'v4', auth: oAuth2Client })
}
const valuesToJson = (arrayValues) => {
  let headers = arrayValues[0]
  let values = arrayValues.slice(1)
  return values
    .filter(x => (x[0] === 'TRUE')) // only if they are marked ready for the App
    .map((val) => { // turn the array into an object
      let o = {}
      for (var i = 0; i < headers.length; i++) {
        let header = headers[i]
        o[`${header}`] = val[i]
      }
      return o
    })
}

/* GET a sheet. */
router.get('/v1/sheets/:id', async function (req, res) {
  const { id } = req.params
  let user = req.user
  const sheets = authorisedSheets(user.googleAuth)
  sheets.spreadsheets.get({
    spreadsheetId: id
  }, (err, response) => {
    if (err) return res.status(500).send(err)
    let data = response.data
    console.log('data', data)
    return res.send(data)
  })
  
})
router.get('/v1/sheets/:id/:range', async function (req, res) {
  const { id, range } = req.params
  const { raw } = req.query
  let user = req.user
  const sheets = authorisedSheets(user.googleAuth)
  sheets.spreadsheets.values.get({ 
    spreadsheetId: id, range: range, 
  }, (err, response) => {
    if (err) return res.status(500).send(err)
    else if (raw) return res.send(response.data)
    else {
      let data = response.data
      let formatted = valuesToJson(data.values)
      return res.send({ ...data, values: formatted })
    }
  })
  
})

module.exports = router
