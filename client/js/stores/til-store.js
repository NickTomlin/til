'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:til-store');

module.exports = function (UserStore) {
  var _items = {};

  function add (til) {
    _items[til.id] = til;
    log('updated', _items);
  }

  var tilStore = store({
    get: function () {
      return Object.keys(_items).map(function (key) {
        return _items[key];
      });
    },
    handler: function (type, payload) {
      switch (type) {
        case events.RECEIVE_TIL:
        case events.ADD_TIL:
          log('add', payload);
          this.waitFor(UserStore.dispatchToken);
          add(payload.til);
          this.emitChange();
        break;

        default:
      }
    }
  });
  return tilStore;
};
