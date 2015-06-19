'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('serverActionCreators', function () {
  beforeEach(easyInject('$rootScope serverActionCreators'));
  beforeEach(function () {
    sandbox.spy(dispatcher, 'dispatch');
  });

  describe('receiveTILS', function () {
    beforeEach(function () {
      this.payload = {
        type: events.RECEIVE_TILS,
        til: [
          {
            text: 'test'
          }
        ],
        user: []
      };
    });

    it('dispatches new til', function() {
      this.serverActionCreators.receiveTils(this.payload);
      expect(dispatcher.dispatch).to.have.been.calledWith(this.payload);
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
