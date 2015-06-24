'use strict';

process.env.NODE_ENV = 'test';

var superagent = require('supertest');
var seed = require('../../../bin/seed-db');
var apiRequest = require('./api-request');
var User = require('../../../server/models').user;
var app = require('../../../server');

global.request = superagent(app);
global.agent = superagent.agent(app);
global.api = function () {
  throw new Error('global.req must be overwritten with a request that defines an access token');
};

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
    User.findOne({email: 'marty@mcfly.com'})
      .then(function (user) {
        global.api = apiRequest(app, function (req) {
          req.set('authorization', 'Bearer ' + user.getAccessToken());
        });
        done();
      })
      .catch(done);
  });
});

after(function () {
  seed.close();
});
