'use strict';

var debug = require('debug');

function noop () {}

module.exports = function () {
  if (global.test) { return noop; }
  return debug.apply(debug, arguments);
};
