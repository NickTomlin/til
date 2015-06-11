'use strict';

var keyMirror = require('keymirror');

module.exports = {
  events: keyMirror({
    STORE_CHANGE: null,
    CLIENT_ACTION: null,
    SEVER_ACTION: null,
    ADD_TIL: null,
    ADD_COMMENT: null,
    RECEIVE_TILS: null,
    RECEIVE_TILS_ERROR: null,
    ADD_TIL_SUCCESS: null,
    ADD_USER: null,
    RECEIVE_USER: null,
    AUTHORIZE_SUCCESS: null,
    AUTHORIZE_FAILURE: null
  })
};
