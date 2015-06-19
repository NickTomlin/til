'use strict';

var User = require('../../../../server/models').user;

describe('Users', function () {
  before(function (done) {
    var context = this;
    User
      .findOne({})
      .then(function (user) {
        context.user = user;
        done();
      });
  });

  it('returns a user', function (done) {
    request
      .get('/api/user/' + this.user._id)
      .expect(200)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body.displayName).to.eql(this.user.displayName);
        done();
      }.bind(this));
  });
});
