'use strict';

var User = require('../../../../server/models').user;

describe('Users', function () {
  before(function (done) {
    User
      .findOne({})
      .then(function (user) {
        this.user = user;
        this.baseRoute = '/api/user/' + user._id;
        done();
      }.bind(this))
      .catch(done);
  });

  describe('GET /user', function () {
    beforeEach(function (done) {
      api
      .get(this.baseRoute)
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }
        this.response = res.body;
        done();
      }.bind(this));
    });

    it('returns a user', function () {
      expect(this.response.displayName).to.eql(this.user.displayName);
    });
  });

  describe('POST /reset-api-token', function () {
    it('resets the user\'s api token', function (done) {
      var oldToken = this.user.accessToken;

      api
      .post(this.baseRoute + '/reset-access-token')
      .expect(201)
      .end(function (err, response) {
        if (err) { return done(err); }
        expect(response.body.accessToken).to.be.ok;
        expect(response.body.accessToken).not.eql(oldToken);
        done();
      });
    });
  });
});
