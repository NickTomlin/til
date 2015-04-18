'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:comment-store');

module.exports = function (TilStore) {
  var _comments = {};

  function add (comment) {
    if (_comments[comment.tilId]) {
      _comments[comment.tilId].push(comment);
    } else {
      _comments[comment.tilId] = [comment];
    }
    log('updated', _comments);
  }

  return store({
    get: function () {
      return _comments;
    },
    getForTil: function (tilId) {
      return _comments[tilId] || [];
    },
    handler: function (type, payload) {
      switch (type) {
        case events.ADD_COMMENT:
          log('add', payload);
          this.waitFor(TilStore.dispatchToken);
          add(payload.comment);
          this.emitChange();
        break;

        default:
      }
    }
  });
};
