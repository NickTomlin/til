'use strict';

var dispatcher = require('../dispatcher');
var log = require('../lib/log')('actions:server');
var events = require('../constants').events;

module.exports = function () {
  this.addUser = function (user) {
    log('addUser', user);
    dispatcher.dispatch({
      type: events.ADD_USER,
      user: user
    });
  },
  this.receiveTil = function (til) {
    log('addTil', til);
    dispatcher.dispatch({
      type: events.RECEIVE_TIL,
      til: til
    });
  }
};
