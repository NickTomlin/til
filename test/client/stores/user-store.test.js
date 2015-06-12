'use strict';

var events = require('til/constants').events;

describe('User Store', function () {
  beforeEach(inject(function (_UserStore_) {
    this.UserStore = _UserStore_;
    this.addUserPayload = {user: {_id: 1, displayName: 'Marty Mcfly'}};
  }));

  describe('methods', function () {
    describe('getByDisplayName', function () {
      it('returns a user', function () {
        this.UserStore.handler(events.ADD_USER, this.addUserPayload);
        expect(this.UserStore.getByDisplayName('Marty Mcfly')).to.have.property('_id');
      });

      it('returns undefined if displayName does not match user', function () {
        expect(this.UserStore.getByDisplayName('James Brown')).to.eql(undefined);
      });
    });
  });

  describe('dispatches', function () {
    describe('addUser', function () {
      it('adds an user', function () {
        this.UserStore.handler(events.ADD_USER, this.addUserPayload);
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
