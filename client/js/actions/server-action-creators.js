'use strict';

var dispatcher = require('../dispatcher');
var log = require('../lib/log')('actions:server');
var events = require('../constants').events;

module.exports = function () {
  this.addUser = function (user) {
    log(events.ADD_USER, user);
    dispatcher.dispatch({
      type: events.ADD_USER,
      user: user
    });
  };

  this.receiveTil = function (til) {
    log(events.RECEIVE_TIL, til);

    dispatcher.dispatch({
      type: events.RECEIVE_TIL,
      til: til
    });
  };

  this.receiveTilError = function (body) {
    dispatcher.dispatch({
      type: events.RECEIVE_TIL_ERROR,
      errors: body.errors,
      clientId: body.clientId
    });
  };
};
