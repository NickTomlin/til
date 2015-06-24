'use strict';

describe('authorize', function () {
  it('returns a 401 and a false authorize status if user is not authorized', function (done) {
    request.get('/api/authorize')
      .expect(401)
      .end(function (err, res) {
        expect(res.body.authorized).to.equal.false;
        expect(res.body).to.not.have.property('user');
        done();
      });
  });

  it('returns a user object', function (done) {
    api.get('/api/authorize')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('returns a user object with an accessToken property', function (done) {
    api.get('/api/authorize')
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }
        expect(res.body.user).to.have.property('accessToken');
        done();
      });
  });
});
