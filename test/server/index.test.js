'use strict';

describe('TilApp', function () {
  it('returns a base template', function (done) {
    request.get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });
});
