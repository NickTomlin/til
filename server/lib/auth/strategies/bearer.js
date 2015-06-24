'use strict';

var User = require('../../../models/user');
var logger = require('../../logger');
var BearerStrategy = BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = new BearerStrategy({},
  function(token, done) {
    User.findOne({accessToken: token}, function (err, userDocument) {
      logger.info('Bearer auth', err, userDocument, {});
      if (err) { return done(err); }
      if (!userDocument) { return done(null, false); }
      var user = userDocument.toObject();
      user.accessToken = userDocument.getAccessToken();
      return done(null, user, {scope: 'all'});
    });
  }
);
