'use strict';

var dispatcher = require('../dispatcher');
var uuid = require('node-uuid').v1;
var log = require('../lib/log')('actions:client');
var events = require('../constants').events;

module.exports = function ($http, serverActions) {
  this.addTIL = function (til) {
    log(events.ADD_TIL, til);
    til.id = uuid();
    dispatcher.dispatch({
      type: events.ADD_TIL,
      til: til
    });

    // todo: use a service here
    $http.post('/api/til', til)
      .then(function (res) {
        serverActions.receiveTil(res.data.til);
      });
  };

  this.addComment = function (comment) {
    log(events.ADD_COMMENT, comment);
    comment.id = uuid();
    dispatcher.dispatch({
      type: events.ADD_COMMENT,
      comment: comment
    });
  };
};
