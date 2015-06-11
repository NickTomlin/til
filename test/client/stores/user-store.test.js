'use strict';

var events = require('til/constants').events;

describe('User Store', function () {
  beforeEach(inject(function (_UserStore_) {
    this.UserStore = _UserStore_;
    this.addUserPayload = {user: {id: 1}};
  }));

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
