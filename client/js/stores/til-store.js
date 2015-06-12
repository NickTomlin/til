'use strict';

var store = require('../lib/base-store');
var _ = require('lodash');
var events = require('../constants').events;
var log = require('../lib/log')('stores:til-store');

module.exports = function (UserStore, TilService, uuid) {
  var _items = {};
  var _serverToClientMap = {};

  function getUserDataForComment (comment) {
    comment.user = UserStore.get(comment.userId);
  }

  function addCommentToTil (comment) {
    var til = _items[comment.tilClientId];

    if (!comment.clientId) {
      comment.clientId = uuid();
    }

    comment.tilId = til._id;
    getUserDataForComment(comment);
    til.comments.push(comment);

    return comment;
  }

  function prepareTil (til) {
    if (!til.comments) {
      til.comments = [];
    }

    if (til.timestamp) {
      til.timestamp = new Date(til.timestamp);
    } else {
      til.timestamp = new Date();
    }

    til.comments.forEach(getUserDataForComment);
    til.user = UserStore.get(til.userId);

    return til;
  }

  function addTilOnClient(til) {
    til.clientId = uuid();
    prepareTil(til);
    _items[til.clientId] = til;
    TilService.add(til);
  }

  function receiveTilFromServer(til) {
    prepareTil(til);

    if (til.clientId) {
      _serverToClientMap[til._id] = til.clientId;
      _items[til.clientId] = til;
    } else if (_serverToClientMap[til._id]) {
      var clientId = _serverToClientMap[til._id];
      til.clientId = clientId;
      _items[clientId] = til;
    } else {
      til.clientId = til._id;
      _serverToClientMap[til._id] = til.clientId;
      _items[til.clientId] = til;
    }
  }

  function saveComment (comment) {
    TilService.addComment(comment);
  }

  function addErrors (payload) {
    var errorTil = _items[payload.clientId];
    errorTil.errors = payload.errors;
  }

  var tilStore = store({
    get: function () {
      return _.values(_items);
    },
    getTilsForUser: function (userId) {
      return _.filter(_items, function (item) {
        return item.user._id === userId;
      });
    },
    handler: function (type, payload) {
      switch (type) {
        case events.RECEIVE_TILS_ERROR:
          log(events.RECEIVE_TILS_ERROR, payload);
          this.waitFor(UserStore.dispatchToken);
          addErrors(payload);
          this.emitChange();
        break;

        case events.ADD_TIL_SUCCESS:
          log(events.ADD_TIL_SUCCESS, payload);
          receiveTilFromServer(payload.til);
          this.emitChange();
        break;

        case events.ADD_COMMENT:
          log(events.ADD_COMMENT, payload);
          var storedComment = addCommentToTil(payload.comment);
          saveComment(storedComment);
          this.emitChange();
        break;

        case events.RECEIVE_TILS:
          log(events.RECEIVE_TILS, payload);
          this.waitFor(UserStore.dispatchToken);
          payload.til.forEach(receiveTilFromServer);
          this.emitChange();
        break;

        case events.ADD_TIL:
          log(events.ADD_TIL, payload);
          this.waitFor(UserStore.dispatchToken);
          addTilOnClient(payload.til);
          this.emitChange();
        break;

        default:
      }
    }
  });
  return tilStore;
};
