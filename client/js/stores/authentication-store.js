'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:auth-store');

module.exports = function () {
  var _auth = {user: {}};

  function login (user) {
    _auth.user = user;
  }

  return store({
    getCurrentUserId: function () {
      return _auth.user._id;
    },
    isAuthenticated: function () {
      return !!_auth.user._id;
    },
    handler: function (type, payload) {
      switch (type) {
        case events.AUTHORIZE_SUCCESS:
          log(events.AUTHORIZE_SUCCESS, payload);
          login(payload.user);
          this.emitChange();
        break;

        default:
      }
    }
  });
};
