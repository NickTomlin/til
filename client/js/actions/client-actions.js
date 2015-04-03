'use strict';

var dispatcher = require('../dispatcher');
var debug = require('debug')('actions:client');
var events = require('../constants').events;

module.exports = function () {
  this.addTIL = function (title) {
    debug('addTil', title);
    dispatcher.dispatch({
      type: events.ADD_TIL,
      title: title
    });
  }
};
