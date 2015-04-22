'use strict';

var Comment = require('../../../server/models/comment');

describe('commentModel', function () {
  beforeEach(function () {
    this.validComment = {
      text: 'A comment'
    };
  });

  it('validates existence of text', function (done) {
    new Comment({}).validate(function (err) {
      expect(err.errors).to.have.property.text;
      done();
    });
  });

  it('allows creation of valid comment', function (done) {
    new Comment(this.validComment).validate(done);
  });
});
