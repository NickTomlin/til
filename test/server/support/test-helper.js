'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest');
var seed = require('../../../bin/seed-db');
var app = require('../../../server');

global.request = request(app);
global.agent = request.agent(app);

global.helpers = {
  login: function (cb) {
    global.agent
      .post('/auth/basic')
      .type('form')
      .send({
        email: 'marty@mcfly.com',
        password: 'insignificant'
      })
      .end(cb);
  }
};

before(function (done) {
  seed.populate().then(function () {
    done();
  });
});

after(function () {
  seed.close();
});
