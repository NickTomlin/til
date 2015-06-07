'use strict';

describe('Til Service', function () {
  beforeEach(inject(function ($rootScope, TilStore, TilService, $httpBackend, serverActionCreators) {
    this.$rootScope = $rootScope;
    this.TilService = TilService;
    this.$httpBackend = $httpBackend;
    this.serverActionCreators = serverActionCreators;

    sandbox.stub(this.serverActionCreators, 'addTilSuccess');

    this.til = {
      text: 'test'
    };
  }));

  afterEach(function () {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  describe('addTil()', function () {
    it('posts til to server', function() {
      this.TilService.add(this.til);
      this.$httpBackend.expectPOST(this.TilService._ENDPOINT, this.til).respond(201);
      this.$httpBackend.flush();
    });

    it('triggers a server action when adding fails', function () {
      sandbox.stub(this.serverActionCreators, 'receiveTilError');
      var data = {errors: ['error']};
      this.$httpBackend.whenPOST(this.TilService._ENDPOINT).respond(401, data);

      this.TilService.add(this.til);
      this.$httpBackend.flush();

      expect(this.serverActionCreators.receiveTilError).to.have.been.calledWith(data);
    });
  });
});
