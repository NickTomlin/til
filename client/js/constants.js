'use strict';

var keyMirror = require('keymirror');

module.exports = {
  events: keyMirror({
    STORE_CHANGE: null,
    CLIENT_ACTION: null,
    SEVER_ACTION: null,
    ADD_TIL: null
  }),
};
