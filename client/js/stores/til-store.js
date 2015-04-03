'use strict';

var store = require('../lib/base-store');
var events = require('../constants').events;
var debug = require('debug')('stores:til-store');
var _items = [];

function addTil (title) {
  _items.push({
    title: title
  });

  debug('updated', _items);
}

module.exports = function () {
  var tilStore = store({
    get: function () {
      return _items;
    },
    handler: function (type, payload) {
      switch(type) {
        case events.ADD_TIL:
          debug('received til', payload);
          addTil(payload.title);
          this.emitChange();
        break;
      }
    }
  });

  return tilStore;
};
