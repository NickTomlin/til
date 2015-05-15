'use strict';

var dispatcher = require('../dispatcher');
var log = require('../lib/log')('actions:client');
var events = require('../constants').events;

module.exports = function ($http, serverActionCreators) {
  this.addTIL = function (til) {
    log(events.ADD_TIL, til);
    dispatcher.dispatch({
      type: events.ADD_TIL,
      til: til
    });

    // todo: use a service here
    $http.post('/api/til', til)
      .then(function (res) {
        serverActionCreators.receiveTil(res.data.til);
      })
      .catch(function (res) {
        serverActionCreators.receiveTilError(res.data);
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
