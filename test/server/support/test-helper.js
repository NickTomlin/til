'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest');
var seed = require('../../../bin/seed-db');
var app = require('../../../server');

global.request = request(app);

before(function (done) {
  seed()
  .then(function () {
    console.log('DONE');
    done();
  });
});

after(function (done) {
  seed.clean().then(done);
});
