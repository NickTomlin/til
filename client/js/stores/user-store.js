'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:user-store');

module.exports = function () {
  var _users = {};

  function add (userObj) {
    _users[userObj.id] = userObj;
    log('updated', _users);
  }

  return store({
    get: function () {
      return _users;
    },
    handler: function (type, payload) {
      switch(type) {
        case events.ADD_USER:
          log('Add', payload);
          add(payload.user);
          this.emitChange();
        break;
      }
    }
  });
};
