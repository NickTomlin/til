'use strict';

var Til = require('../../../server/models/til');

describe('tilModel', function () {
  beforeEach(function () {
    this.validTil = {
      user: '1',
      text: 'test'
    };
  });

  it('validates existence of text', function (done) {
    new Til({}).validate(function (err) {
      expect(err.errors).to.have.property.text;
      done();
    });
  });

  it('allows creation of valid til', function (done) {
    new Til(this.validTil).validate(done);
  });

  it('has a timestamp', function () {
    var til = new Til(this.validTil);

    expect(til.timestamp).to.be.an.instanceof(Date);
  });
});
