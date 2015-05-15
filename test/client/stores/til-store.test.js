'use strict';

var events = require('til/constants').events;

describe('Til Store', function () {
  var todoCreate = {
    type: events.ADD_TIL,
    til: {
      title: 'My great item'
    }
  };

  var tilError = {
    clientId: 'stubbed-client-id',
    errors: {
      text: {
        message: 'Invalid reason'
      }
    }
  };

  beforeEach(angular.mock.module(function ($provide) {
    $provide.service('uuid', function () {
      return function () {
        return 'stubbed-client-id';
      };
    });
  }));

  beforeEach(inject(function (_TilStore_, _TilService_) {
    this.TilStore = _TilStore_;
    this.TilService = _TilService_;

    sandbox.stub(this.TilService, 'add');
  }));

  beforeEach(function () {
    this.til = {
      text: 'test'
    };
  });

  describe('adding', function () {
    it('adds an item', function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);
      expect(this.TilStore.get()).to.have.length(1);
    });

    it('makes a server side call to create the til', function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);

      expect(this.TilService.add).to.have.been.calledWithMatch({
        title: todoCreate.til.title
      });
    });

    it('adds a clientId to new til', function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);
      expect(this.TilStore.get()[0]).to.have.property('clientId');
    });
  });

  describe('error handling', function () {
    it('marks tils with error', function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);
      this.TilStore.handler(events.RECEIVE_TIL_ERROR, tilError);
      expect(this.TilStore.get()[0]).to.have.property('errors');
    });
  });
});
