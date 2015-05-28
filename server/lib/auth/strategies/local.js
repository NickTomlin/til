'use strict';

var logger = require('../../logger');
var User = require('../../../models/user');
var LocalStrategy = require('passport-local').Strategy;

function localAuthHandler (req, email, password, done) {
  logger.info('Local Auth for', email);
  User.findOne({authorizations: {$elemMatch: {uuid: email}}}, function (err, user) {
    logger.info('User lookup', err, user, {});
    if (err) { return done(err); }
    if (!user) { return done(null, false, 'Invalid user'); }

    return done(null, user);
  });
}

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, localAuthHandler);
