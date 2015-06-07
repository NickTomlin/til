'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:til-store');

module.exports = function (UserStore, TilService, uuid) {
  var _items = {};

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

    if (!til.clientId) {
      til.clientId = uuid();
    }

    til.comments.forEach(getUserDataForComment);
    til.user = UserStore.get(til.user._id);
    return til;
  }

  function addTilToItems (tilItem) {
    var til = prepareTil(tilItem);
    _items[til.clientId] = til;

    return til;
  }

  function saveTil (til) {
    TilService.add(til);
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
      return Object.keys(_items).map(function (key) {
        return _items[key];
      });
    },
    handler: function (type, payload) {
      switch (type) {
        case events.RECEIVE_TIL_ERROR:
          log(events.RECEIVE_TIL_ERROR, payload);
          this.waitFor(UserStore.dispatchToken);
          addErrors(payload);
          this.emitChange();
        break;

        case events.ADD_TIL_SUCCESS:
          log(events.ADD_TIL_SUCCESS, payload);
          _items[payload.til.clientId]._id = payload.til._id;
          this.emitChange();
        break;

        case events.ADD_COMMENT:
          log(events.ADD_COMMENT, payload);
          var storedComment = addCommentToTil(payload.comment);
          saveComment(storedComment);
          this.emitChange();
        break;

        case events.RECEIVE_TIL:
          log(events.RECEIVE_TIL, payload);
          this.waitFor(UserStore.dispatchToken);
          addTilToItems(payload.til);
          this.emitChange();
        break;

        case events.ADD_TIL:
          log(events.ADD_TIL, payload);
          this.waitFor(UserStore.dispatchToken);
          var storedTil = addTilToItems(payload.til);
          saveTil(storedTil);
          this.emitChange();
        break;

        default:
      }
    }
  });
  return tilStore;
};
