//
// mocking out an API calls to Pollygot Core
//

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const pg = require('../../db')

const uuidv4 = exports.uuidv4 = () => { // the database can handle this, but *shrug*
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
const getTokens = exports.getTokens = async (userId) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM tokens WHERE user_id = $1', [userId])
    return rows
  } catch (error) {
    console.log('error', error)
  }
}
const getUser = exports.getUser = async (id) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  } catch (error) {
    console.log('error', error)
  }
}
const getUserForKey = exports.getUserForKey = async (key) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM user_tokens WHERE key = $1', [key])
    return rows[0]
  } catch (error) {
    console.log('error', error)
  }
}
const saveToken = exports.saveToken = async (key, userId) => { // eslint-disable-line
  try {
    const text = 'INSERT INTO tokens(key, user_id) VALUES($1, $2) RETURNING *'
    const values = [key, userId]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
  }
}
const saveUser = exports.saveUser = async (user) => { // eslint-disable-line
  try {
    const text = 'INSERT INTO users(id, data) VALUES($1, $2) RETURNING *'
    const values = [user.id, user]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
  }
}
