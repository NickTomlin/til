'use strict';

var config = require('../lib/config');
var app = require('express')();
var logger = require('./lib/logger');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var serveStatic = require('serve-static');

console.log('Connecting to', config.get('db'));
mongoose.connect(config.get('db'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(serveStatic('dist'));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use(require('./routes'));

app.use(function (err, req, res, next) {
  console.log('Express Error', err);
  logger.error(err);
  next(err);
});

module.exports = app;
