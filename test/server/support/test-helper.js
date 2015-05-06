'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest');
var seed = require('../../../bin/seed-db');
var app = require('../../../server');

global.request = request(app);

before(function (done) {
  seed.populate().then(function () {
    done()
  });
});

after(function () {
  seed.close();
});
