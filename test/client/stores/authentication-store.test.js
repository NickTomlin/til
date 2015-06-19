'use strict';

var events = require('til/constants').events;

describe('Authentication Store', function () {
  beforeEach(easyInject('AuthenticationStore', function () {
    this.addAuthenticationPayload = {user: {_id: 'my-id'}};
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

  describe('#currentUserId()', function () {
    it('returns the id of the current user', function () {
      this.AuthenticationStore.handler(events.AUTHORIZE_SUCCESS, this.addAuthenticationPayload);
      expect(this.AuthenticationStore.getCurrentUserId()).to.eql('my-id');
    });
  });
});
