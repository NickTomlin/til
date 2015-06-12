'use strict';

var logger = require('../../logger');
var config = require('../../../lib/config');
var User = require('../../../models/user');
var GitHubStrategy = require('passport-github2').Strategy;

function githubAuthHandler(accessToken, refreshToken, profile, done) {
  logger.info('Authenticated', profile.id, profile, {});

  User.findOneAndUpdate(
    {authorizations: {$elemMatch: {uuid: profile.id}}},
    {
      $setOnInsert: {
        username: profile.username.toLowerCase(),
        authorizations: [{name: 'Github', uuid: profile.id}]
      },
      $set: {
        displayName: profile.displayName,
        email: profile.emails[0].value
      }
    },
    {
      new: true,
      upsert: true
    },
    function (err, result) {
      logger.info('Github Auth %j : %j', err, result, {});
      done(err, result);
    });
}

module.exports = new GitHubStrategy({
  clientID: config.get('github-id'),
  clientSecret: config.get('github-secret'),
  userAgent: 'Til-Development',
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, githubAuthHandler);
