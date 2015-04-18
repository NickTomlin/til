'use strict';

var models = require('../../server/models');

describe('api', function () {
  it('provides a way to query any collection', function (done) {
    models.til.find({}, function (error, tils) {
      request.get('/api/til')
        .expect(200)
        .end(function (err, res) {
          expect(res.body.length).to.eql(tils.length);
          done();
        });
    });
  });

  it('creates items in a collection', function (done) {
    var til = {
      text: '#supertest is a great way to test api endpoints in #express'
    };

    request
      .post('/api/til')
      .send(til)
      .expect(201)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body.til.text).to.eql(til.text);
        done();
      });
  });

  it('does not allow creation of invalid models', function (done) {
    var til = {
      foo: 'bar'
    };

    request
      .post('/api/til')
      .send(til)
      .expect(400, function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('errors');
        done();
      });
  });

  it('returns a 404 for a nonexistant collection', function (done) {
    request.get('/api/foobar')
      .expect(404, done);
  });
});
