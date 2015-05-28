'use strict';

var passport = require('passport');
var localStrategy = require('./strategies/local');
var githubStrategy = require('./strategies/github');
var User = require('../../models/user');
var logger = require('../logger');

passport.use(githubStrategy);
if (process.env.NODE_ENV === 'development') {
  passport.use(localStrategy);
}

passport.serializeUser(function(user, done) {
  console.log('serialze');
  logger.info('serializeUser', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize');
  logger.info('deserializeUser', id);
  User.findById(id, function (err, user) {
    logger.info('deserializeUser::find', err, user, {});
    done(err, user);
  });
});

module.exports = passport;
