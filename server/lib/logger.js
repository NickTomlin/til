'use strict';

var config = require('../../lib/config');
var path = require('path');
var winston = require('winston');

var logFile = path.resolve(__dirname + '../../../log', config.get('log_file'));
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({filename: logFile})
  ]
});

module.exports = logger;
