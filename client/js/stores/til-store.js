'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var log = require('../lib/log')('stores:til-store');

module.exports = function (UserStore) {
  var _items = [];

  function add (til) {
    _items.push(til);
    log('updated', _items);
  }

  var tilStore = store({
    get: function () {
      return _items;
    },
    handler: function (type, payload) {
      switch(type) {
        case events.RECEIVE_TIL:
        case events.ADD_TIL:
          log('add', payload);
          this.waitFor(UserStore.dispatchToken);
          add(payload.til);
          this.emitChange();
        break;
      }
    }
  });
  return tilStore;
};
