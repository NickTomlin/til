'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:user-store');

module.exports = function () {
  var _users = {};

  function add (userObj) {
    _users[userObj._id] = userObj;
    log('updated', _users);
  }

  return store({
    get: function (_id) {
      return _users[_id] || {};
    },
    all: function () {
      return _users;
    },
    handler: function (type, payload) {
      switch (type) {
        case events.RECEIVE_TILS:
          var user = payload.user;
          if (user) {
            payload.user.forEach(add);
            this.emitChange();
          }
        break;

        case events.AUTHORIZE_SUCCESS:
        case events.ADD_USER:
          log('Add/Authorize', payload);
          add(payload.user);
          this.emitChange();
        break;
        default:
      }
    }
  });
};
