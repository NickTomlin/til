'use strict';

var User = require('../../../server/models/user');
var monky = require('../support/factories');

describe('userModel', function () {
  beforeEach(function () {
    this.validUser = {
      userId: '1',
      username: 'biff',
      displayName: 'Biff Something',
      email: 'biff@jerk.com'
    };
  });

  it('has an access token', function (done) {
    monky.create('user')
      .then(function (user) {
        expect(user.accessToken).to.be.ok;
        done();
      });
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

  it('does not include accessToken in toObject or toJson', function (done) {
    monky.create('user')
      .then(function (user) {
        expect(user.toJSON()).to.not.have.property('accessToken');
        expect(user.toObject()).to.not.have.property('accessToken');
        done();
      })
      .catch(done);
  });

  it('does not allow duplicate usernames', function (done) {
    var user1 = new User(this.validUser);
    var user2 = new User(this.validUser);

    user1
    .save(function (err) {
      if (err) { return done(err); }
      expect(user2.save(function (err2) {
        expect(err2.message).to.match(/duplicate key error index/);
        done();
      }));
    });
  });
});
