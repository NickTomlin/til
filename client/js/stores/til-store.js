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
    if (!comment.clientId) {
      comment.clientId = uuid();
    }
    var til = _items[comment.tilClientId];
    getUserDataForComment(comment);
    til.comments.push(comment);
  }

  function prepareTil (til) {
    if (!til.comments) {
      til.comments = [];
    }

    if (!til.clientId) {
      til.clientId = uuid();
    }

    til.comments.forEach(getUserDataForComment);
    til.user = UserStore.get(til.userId);
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
          log('til error', payload);
          this.waitFor(UserStore.dispatchToken);
          addErrors(payload);
          this.emitChange();
        break;

        case events.ADD_COMMENT:
          log('add commment', payload);
          addCommentToTil(payload.comment);
          this.emitChange();
        break;

        case events.RECEIVE_TIL:
          log('receive', payload);
          this.waitFor(UserStore.dispatchToken);
          addTilToItems(payload.til);
          this.emitChange();
        break;

        case events.ADD_TIL:
          log('add', payload);
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
