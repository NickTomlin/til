'use strict';

var config = require('../lib/config');
var app = require('express')();
var mongoose = require('mongoose');
var morgan = require('morgan');
var serveStatic = require('serve-static');

mongoose.connect(config.get('db'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(serveStatic('dist'));

app.use('/api', require('./routes/api'));
app.use(require('./routes'));

module.exports = app;
