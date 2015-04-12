'use strict';

var dispatcher = require('../dispatcher');
var log = require('../lib/log')('actions:client');
var events = require('../constants').events;

module.exports = function () {
  this.addTIL = function (til) {
    log('addTil', til);
    dispatcher.dispatch({
      type: events.ADD_TIL,
      til: til
    });
  }
  this.addUser = function (user) {
    log('addUser', user);
    dispatcher.dispatch({
      type: events.ADD_USER,
      user: user
    });
  }
};
