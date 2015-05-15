'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('clientActionCreators', function () {
  beforeEach(inject(function ($rootScope, clientActionCreators) {
    this.$rootScope = $rootScope;
    this.clientActionCreators = clientActionCreators;
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
