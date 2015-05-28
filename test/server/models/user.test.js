'use strict';

var User = require('../../../server/models/user');

describe('userModel', function () {
  beforeEach(function () {
    this.validUser = {
      userId: '1',
      text: 'test'
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
});
