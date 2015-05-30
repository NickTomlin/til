'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:user-store');

module.exports = function () {
  var _auth = {user: {}};

  function login (user) {
    _auth.user = user;
  }

  return store({
    getCurrentUserId: function () {
      return _auth.user.id;
    },
    isAuthenticated: function () {
      return !!_auth.user.id;
    },
    handler: function (type, payload) {
      switch (type) {
        case events.AUTHORIZE_SUCCESS:
          log('Login', payload);
          login(payload.user);
          this.emitChange();
        break;

        default:
      }
    }
  });
};
