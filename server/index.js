'use strict';

var app = require('express')();
var morgan = require('morgan');
var serveStatic = require('serve-static');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(serveStatic('dist'));

app.use(require('./routes/api'));
app.use(require('./routes'));

module.exports = app;
