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

  it('returns a 404 for a nonexistant collection', function (done) {
    request.get('/api/foobar')
      .expect(404, done);
  });
});
