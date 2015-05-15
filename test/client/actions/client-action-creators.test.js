'use strict';

var dispatcher = require('til/dispatcher');
var events = require('til/constants').events;

describe('clientActionCreators', function () {
  beforeEach(inject(function ($rootScope, $http, $q, clientActionCreators, serverActionCreators) {
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$q = $q;
    this.clientActionCreators = clientActionCreators;
    this.serverActionCreators = serverActionCreators;
    sandbox.spy(dispatcher, 'dispatch');
  }));

  describe('addTil', function () {
    beforeEach(function () {
      var deferred = this.$q.defer();
      this.tilRequest = deferred;
      sandbox.stub(this.$http, 'post').returns(this.tilRequest.promise);
      this.til = {
        text: 'test'
      };
    });

    it('dispatches new til', function() {
      this.clientActionCreators.addTIL(this.til);

      expect(dispatcher.dispatch).to.have.been.calledWith({
        type: events.ADD_TIL,
        til: this.til
      });
    });

    it('posts til to server', function() {
      this.clientActionCreators.addTIL(this.til);
      expect(this.$http.post.lastCall.args[1]).to.contain(this.til);
    });

    it('triggers server action when request succeeds', function () {
      sandbox.spy(this.serverActionCreators, 'receiveTil');

      this.tilRequest.resolve({data: {til: this.til }});
      this.clientActionCreators.addTIL(this.til);
      this.$rootScope.$digest();

      expect(this.serverActionCreators.receiveTil).to.have.been.calledWith(this.til);
    });
  });
});
