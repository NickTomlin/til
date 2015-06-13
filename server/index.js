'use strict';

var config = require('./lib/config');
var app = require('express')();
var logger = require('./lib/logger');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var session = require('express-session');
var RedisStore = require('connect-redis')(session); // include AFTER session
var auth = require('./lib/auth');

console.log('Connecting to', config.get('db')); // eslint-disable-line no-console
mongoose.connect(config.get('db'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(serveStatic('dist'));
app.use(session({
  store: new RedisStore({
    db: parseInt(config.get('redis-db'), 10) || 0
  }),
  secret: config.get('session-secret') || 'supercalafragalisticexpialadocies',
  resave: false,
  saveUninitialized: true
}));

app.use(auth.initialize());
app.use(auth.session());
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/auth')); // auth internally prefixes with /auth
app.use(require('./routes'));

app.use(function (err, req, res, next) {
  logger.error(err);
  next(err);
});

module.exports = app;
