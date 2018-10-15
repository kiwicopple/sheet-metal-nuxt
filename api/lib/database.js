//
// mocking out an API calls to Pollygot Core
//

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(process.env.LOCAL_DATA_STORE)
const db = low(adapter)

const uuidv4 = exports.uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
const getSheet = exports.getSheet = (id) => { // eslint-disable-line
  let sheets = db.get('sheets').value()
  return sheets.find(x => (x.id === id)) || null
}
const getSheets = exports.getSheets = (userId) => { // eslint-disable-line
  let sheets = db.get('sheets').value()
  return sheets.filter(x => (x.user_id === userId)) || []
}
const getToken = exports.getToken = (id) => { // eslint-disable-line
  let tokens = db.get('tokens').value()
  return tokens.find(x => (x.id === id)) || null
}
const getTokens = exports.getTokens = (userId) => { // eslint-disable-line
  let sheets = db.get('tokens').value()
  return sheets.filter(x => (x.user_id === userId)) || null
}
const getUser = exports.getUser = (id) => { // eslint-disable-line
  let users = db.get('users').value()
  return users.find(x => (x.id === id)) || null
}
const getUserForKey = exports.getUserForKey = (key) => { // eslint-disable-line
  let users = db.get('users').value()
  let tokens = db.get('tokens').value()
  let token = tokens.find(x => (x.id.toString() === key.toString())) || null
  console.log('token', token)
  if (!token) return null
  else return users.find(x => (x.id.toString() == token['user_id'].toString())) || null
}
const saveSheet = exports.saveSheet = (sheet, userId) => { // eslint-disable-line
  return db.get('sheets').push({ ...sheet, user_id: userId }).write().id
}
const saveToken = exports.saveToken = (token, userId) => { // eslint-disable-line
  return db.get('tokens').push({ ...token, user_id: userId }).write().id
}
const saveUser = exports.saveUser = (user) => { // eslint-disable-line
  db.get('users').remove({ id: user.id.toString() }).write() // remove the user if they already exist (should only be one)
  return db.get('users').push({ ...user }).write().id
}
