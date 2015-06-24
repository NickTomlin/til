'use strict';

var passport = require('passport');
var localStrategy = require('./strategies/local');
var githubStrategy = require('./strategies/github');
var bearerStrategy = require('./strategies/bearer');
var User = require('../../models/user');
var logger = require('../logger');

passport.use(githubStrategy);
passport.use(bearerStrategy);
if (/test|development/.test(process.env.NODE_ENV)) {
  passport.use(localStrategy);
}

passport.serializeUser(function(user, done) {
  logger.info('serializeUser', user._id);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, userDocument) {
    logger.info('deserializeUser::find', err, userDocument, {});
    if (err || !userDocument) { return done(err); }
    var user = userDocument.toObject();
    user.accessToken = userDocument.getAccessToken();

    done(err, user);
  });
});

module.exports = passport;
