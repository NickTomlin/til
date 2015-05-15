'use strict';

var dispatcher = require('../dispatcher');
var log = require('../lib/log')('actions:client');
var events = require('../constants').events;

module.exports = function () {
  this.addTIL = function (til) {
    log(events.ADD_TIL, til);
    dispatcher.dispatch({
      type: events.ADD_TIL,
      til: til
    });
  };

  this.addComment = function (comment) {
    log(events.ADD_COMMENT, comment);
    dispatcher.dispatch({
      type: events.ADD_COMMENT,
      comment: comment
    });
  };
};
