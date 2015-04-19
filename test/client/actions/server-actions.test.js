'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('serverActions', function () {
  beforeEach(inject(function ($rootScope, $http, $q, serverActions) {
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$q = $q;
    this.serverActions = serverActions;
    sandbox.spy(dispatcher, 'dispatch');
  }));

  describe('receiveTIL', function () {
    beforeEach(function () {
      var deferred = this.$q.defer();
      this.tilRequest = deferred;
      sandbox.stub(this.$http, 'post').returns(this.tilRequest.promise);
      this.til = {
        text: 'test'
      };
    });

    it('dispatches new til', function() {
      this.serverActions.receiveTil(this.til);

      expect(dispatcher.dispatch).to.have.been.calledWith({
        type: events.RECEIVE_TIL,
        til: this.til
      });
    });

    it('adds a clientId to a til if it does not exist', function () {
      this.serverActions.receiveTil(this.til);
      var newTil = dispatcher.dispatch.lastCall.args[0].til;
      expect(newTil).to.have.property('clientId');
    });

    it('does not add a clientId if it already exists on incoming til', function () {
      this.til.clientId = 'old';
      this.serverActions.receiveTil(this.til);
      var newTil = dispatcher.dispatch.lastCall.args[0].til;
      expect(newTil.clientId).to.eql('old');
    });
  });
});
