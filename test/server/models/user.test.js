'use strict';

var User = require('../../../server/models/user');

describe('userModel', function () {
  beforeEach(function () {
    this.validUser = {
      userId: '1',
      username: 'biff',
      displayName: 'Biff Something',
      email: 'biff@jerk.com'
    };
  });

  it('validates existence of text', function (done) {
    new User({}).validate(function (err) {
      expect(err.errors).to.have.property.text;
      done();
    });
  });

  it('allows creation of valid user', function (done) {
    new User(this.validUser).validate(done);
  });

  it('does not allow duplicate usernames', function (done) {
    var user1 = new User(this.validUser);
    var user2 = new User(this.validUser);

    user1
      .save()
      .then(function () {
        expect(user2.save(function (err) {
          expect(err.message).to.match(/duplicate key error index/);
          done();
        }));
      });
  });
});
