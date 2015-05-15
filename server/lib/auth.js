'use strict';

var passport = require('passport');
var logger = require('./logger');
var config = require('../lib/config');
var GitHubStrategy = require('passport-github2').Strategy;

function authHandler(accessToken, refreshToken, profile, done) {
  logger.info('Authenticated', profile.id, profile, {});
  // todo, findOrCreate a user (optionally we may want to update)
  // then return that user from our db
  return done(null, profile);
}

passport.use(new GitHubStrategy({
    clientID: config.get('github-id'),
    clientSecret: config.get('github-secret'),
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, authHandler
));

passport.serializeUser(function(user, done) {
  // grab _id off of user and store it
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // look user up in db return
  done(null, obj);
});

module.exports = passport;
