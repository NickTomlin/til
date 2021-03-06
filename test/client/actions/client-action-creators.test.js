'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('clientActionCreators', function () {
  beforeEach(easyInject('$rootScope clientActionCreators', function () {
    sandbox.spy(dispatcher, 'dispatch');

    this.til = {
      text: 'test'
    };
  }));

  describe('addTil', function () {
    it('dispatches new til', function() {
      this.clientActionCreators.addTIL(this.til);

      expect(dispatcher.dispatch).to.have.been.calledWith({
        type: events.ADD_TIL,
        til: this.til
      });
    });
  });
});
