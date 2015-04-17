'use strict';

var request = require('supertest');
var app = require('../../../server');

global.request = request(app);
