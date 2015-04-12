'use strict';

var events = require('til/constants').events;

describe('User Store', function () {
  beforeEach(inject(function (_UserStore_) {
    this.UserStore = _UserStore_;
    this.addUserPayload = {user: {id: 1}};
  }));

  it('adds an user', function () {
    this.UserStore.handler(events.ADD_USER, this.addUserPayload);
    expect(Object.keys(this.UserStore.get())).to.have.length(1);
  });
});
