'use strict';

var path = require('path');
var ENV = (process.env.NODE_ENV || 'development').toLowerCase();
console.log('Loading configuration for', ENV);

var nconf = require('nconf');

nconf.file({
  file: path.resolve(__dirname, '../config/' + ENV + '.yaml'),
  format: require('nconf-yaml')
});

module.exports = nconf;
