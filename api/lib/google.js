'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
const Database = require('../../db/database')
const Sentry = require('@sentry/node')
Sentry.init({ dsn: process.env.SENTRY_DSN })

/**
 * Google may refresh the token upon returning a result
 * Save the token so that it's faster next time (and we don't hit account limits on refreshes)
 */
const handlePotentiallyNewOauth = exports.handlePotentiallyNewOauth = (oldOauth, googleLib, userId) => {
  let responseToken = googleLib['_options'].auth.credentials
  if (oldOauth.access_token !== responseToken.access_token) {
    console.log('newToken needs refreshing', responseToken)
    Database.updateOathForUser(userId, responseToken)
  }
}