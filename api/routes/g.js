const { Router } = require('express')
const { google } = require('googleapis')

const router = Router()

router.get('/g/sheets/', function (req, res) {
  let user = req.user
  const oAuth2Client = new google.auth.OAuth2()
  oAuth2Client.setCredentials(user.googleAuth)
  const drive = google.drive({ version: 'v3', auth: oAuth2Client })
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    console.log('res', res)
  })
})

module.exports = router
