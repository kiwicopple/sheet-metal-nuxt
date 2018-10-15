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
const saveSheet = exports.saveSheet = (sheet, userId) => { // eslint-disable-line
  return db.get('sheets').push({ ...sheet, user_id: userId }).write().id
}
const saveToken = exports.saveToken = (token, userId) => { // eslint-disable-line
  return db.get('tokens').push({ ...token, user_id: userId }).write().id
}
const saveUser = exports.saveUser = (user) => { // eslint-disable-line
  return db.get('users').push({ ...user }).write().id
}
