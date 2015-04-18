'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest');
var app = require('../../../server');

global.request = request(app);
