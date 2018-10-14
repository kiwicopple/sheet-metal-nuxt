require('dotenv').config()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const location = process.env.LOCAL_DATA_STORE
const adapter = new FileSync(location)
const db = low(adapter)

// Set some defaults
db.defaults({
  users: [],
  tokens: []
}).write()
