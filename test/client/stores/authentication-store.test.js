'use strict';

var events = require('til/constants').events;

describe('Authentication Store', function () {
  beforeEach(inject(function (_AuthenticationStore_) {
    this.AuthenticationStore = _AuthenticationStore_;
    this.addAuthenticationPayload = {user: {id: 1}};
  }));

  describe('#isAuthenticated()', function () {
    it('returns true if a user is authenticate', function () {
      this.AuthenticationStore.handler(events.AUTHORIZE_SUCCESS, this.addAuthenticationPayload);
      expect(this.AuthenticationStore.isAuthenticated()).to.eql(true);
    });

    it('returns false if a user is not authenticated', function () {
      expect(this.AuthenticationStore.isAuthenticated()).to.eql(false);
    });
  });
});
