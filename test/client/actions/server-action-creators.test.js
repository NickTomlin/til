'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('serverActionCreators', function () {
  beforeEach(inject(function ($rootScope, serverActionCreators) {
    this.$rootScope = $rootScope;
    this.serverActionCreators = serverActionCreators;
    sandbox.spy(dispatcher, 'dispatch');
  }));

  describe('receiveTIL', function () {
    beforeEach(function () {
      this.til = {
        text: 'test'
      };
    });

    it('dispatches new til', function() {
      this.serverActionCreators.receiveTil(this.til);

      expect(dispatcher.dispatch).to.have.been.calledWith({
        type: events.RECEIVE_TIL,
        til: this.til
      });
    });
  });

  describe('authorizeSuccess', function () {
    beforeEach(function () {
      this.authorizationPayload = {
        user: {
          _id: '1234',
          displayName: 'Marty Mcfly'
        }
      };
    });

    it('dispatches a user', function () {
      this.serverActionCreators.authorizeSuccess(this.authorizationPayload);
    });
  });
});
