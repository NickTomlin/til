'use strict';

var models = require('../../server/models');

describe('api', function () {
  beforeEach(function () {
    this.validTil = {
      text: '#supertest is a great way to test api endpoints in #express',
      userId: '1234'
    };
  });

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
    request
      .post('/api/til')
      .send(this.validTil)
      .expect(201)
      .end(function (err, res) {
        if (err) { done(err); }
        console.log(res.body.errors);
        expect(res.body.til.text).to.eql(this.validTil.text);
        done();
      }.bind(this));
  });

  describe('error handling', function () {
    beforeEach(function () {
      this.invalidTil = {
        foo: 'bar',
        clientId: 'client-id'
      };
    });

    it('does not allow creation of invalid models', function (done) {
      request
      .post('/api/til')
      .send(this.invalidTil)
      .expect(400, function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('errors');
        expect(res.body.clientId).to.equal(this.invalidTil.clientId);
        done();
      }.bind(this));
    });

    it('returns a 404 for a nonexistant collection', function (done) {
      request.get('/api/foobar')
      .expect(404, done);
    });
  });

  describe('Tils', function () {
    it('purposefully rejects tils with a text value of fail', function (done) {
      this.validTil.text = 'fail';
      request
        .post('/api/til')
        .send(this.validTil)
        .expect(400, function (err, res) {
          if (err) { done(err); }
          expect(res.body.errors.text.message).to.match(/purposefully/i);
          done();
        });
    });
  });
});
