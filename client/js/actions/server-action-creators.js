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

  this.receiveUser = function (user) {
    log(events.RECEIVE_USER, user);

    dispatcher.dispatch({
      type: events.RECEIVE_USER,
      user: user
    });
  };

  this.authorizeSuccess = function (body) {
    dispatcher.dispatch({
      type: events.AUTHORIZE_SUCCESS,
      user: body.user
    });
  };

  this.authorizeFailure = function (body) {
    dispatcher.dispatch({
      type: events.AUTHORIZE_SUCCESS,
      errors: body.errors
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
