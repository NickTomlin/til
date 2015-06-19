'use strict';

var events = require('til/constants').events;

describe('User Store', function () {
  beforeEach(easyInject('UserStore UserService', function () {
    this.receiveUserPayload = {user: {_id: 1, displayName: 'Marty Mcfly', username: 'martymcfly'}};
  }));

  describe('methods', function () {
    describe('get', function () {
      it('returns a user if it exists', function () {
        this.UserStore.handler(events.RECEIVE_USER, this.receiveUserPayload);
        expect(this.UserStore.get(1)._id).to.eql(1);
      });

      it('fetches a user if it does not exist', function () {
        sinon.stub(this.UserService, 'get');
        this.UserService.get(100);
        expect(this.UserService.get).to.have.been.calledWith(100);
      });
    });

    describe('getByUsername', function () {
      it('returns a user', function () {
        this.UserStore.handler(events.RECEIVE_USER, this.receiveUserPayload);
        expect(this.UserStore.getByUsername('martymcfly')._id).to.eql(1);
      });

      it('returns undefined if username does not match user', function () {
        expect(this.UserStore.getByUsername('James Brown')).to.eql(undefined);
      });
    });
  });

  describe('dispatches', function () {
    describe('receiveUser', function () {
      it('adds an user', function () {
        this.UserStore.handler(events.RECEIVE_USER, this.receiveUserPayload);
        expect(Object.keys(this.UserStore.all())).to.have.length(1);
      });
    });

    describe('receiveTils', function () {
      it('adds an user', function () {
        this.UserStore.handler(events.RECEIVE_TILS, {user: [{displayName: 'test'}]});
        expect(Object.keys(this.UserStore.all())).to.have.length(1);
      });
    });
  });
});
