const { Router } = require('express')
// const { google } = require('googleapis')

const router = Router()

// router.get('/g/sheets/', function (req, res) {
//   let user = req.user
//   const oAuth2Client = new google.auth.OAuth2()
//   oAuth2Client.setCredentials(user.googleAuth)
//   const drive = google.drive({ version: 'v3', auth: oAuth2Client })
//   drive.files.list({
//     pageSize: 30,
//     fields: 'nextPageToken, files(id, name)',
//     orderBy: 'folder,modifiedTime desc,name'
//   }, (err, response) => {
//     if (err) return res.status(500).send(err + '')
//     else return res.send(response.data)
//   })
// })

// // return a sheet
// router.get('/g/sheet/:id', function (req, res) {
//   let { }
// })

module.exports = router
