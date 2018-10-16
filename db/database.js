'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});

const pg = require('./index')
const Sentry = require('@sentry/node').init({ dsn: process.env.SENTRY_DSN })

/**
 * Return a UUID - good for tokens. The database already handles this too, but *shrug*
 */
const uuidv4 = exports.uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Get tokens for a user
 */
const getTokens = exports.getTokens = async (userId) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM tokens WHERE user_id = $1', [userId])
    return rows
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
  }
}

/**
 * Get a user by their ID
 */
const getUser = exports.getUser = async (id) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
  }
}

/**
 * Return a user for a given token/metal-key
 */
const getUserForKey = exports.getUserForKey = async (key) => { // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM user_tokens WHERE token_key = $1', [key])
    return rows[0]
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
  }
}

/**
 * Save a new token/metal-key
 */
const saveToken = exports.saveToken = async (key, userId) => { // eslint-disable-line
  try {
    const text = 'INSERT INTO tokens(key, user_id) VALUES($1, $2) RETURNING *'
    const values = [key, userId]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
  }
}

/**
 * Create a new user
 */
const saveUser = exports.saveUser = async (user) => { // eslint-disable-line
  try {
    const text = 'INSERT INTO users(id, data) VALUES($1, $2) RETURNING *'
    const values = [user.id, user]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
    Sentry.captureException(error)
  }
}
