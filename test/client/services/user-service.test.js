'use strict';

describe('User Service', function () {
  beforeEach(easyInject('$rootScope UserStore UserService $httpBackend serverActionCreators'));

  afterEach(function () {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  describe('get()', function () {
    it('triggers an receiveUser action on success', function () {
      sandbox.stub(this.serverActionCreators, 'receiveUser');
      var data = {user: {displayName: 'foo'}};
      this.$httpBackend.whenGET(new RegExp(this.UserService._ENDPOINT)).respond(200, data);

      this.UserService.get('my-user-id');
      this.$httpBackend.flush();

      expect(this.serverActionCreators.receiveUser).to.have.been.calledWith(data);
    });
  });

  describe('authorize()', function () {
    it('triggers an authorizeSuccess action on success', function () {
      sandbox.stub(this.serverActionCreators, 'authorizeSuccess');
      var data = {user: {displayName: 'foo'}};
      this.$httpBackend.whenGET('/api/authorize').respond(200, data);

      this.UserService.authorize();
      this.$httpBackend.flush();

      expect(this.serverActionCreators.authorizeSuccess).to.have.been.calledWith(data);
    });

    it('triggers authorizeFailure on failure', function () {
      sandbox.stub(this.serverActionCreators, 'authorizeFailure');
      var data = {user: {displayName: 'foo'}, errors: ['Error']};
      this.$httpBackend.whenGET('/api/authorize').respond(401, data);

      this.UserService.authorize();
      this.$httpBackend.flush();

      expect(this.serverActionCreators.authorizeFailure).to.have.been.calledWithMatch({data: data});
    });
  });
});
