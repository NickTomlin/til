'use strict';

var events = require('til/constants').events;

describe('Til Store', function () {
  var todoCreate = {
    type: events.ADD_TIL,
    til: {
      title: 'My great item',
      user: {
        _id: 'user-id'
      }
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

  describe('tils', function () {
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

    it('adds a timeStamp to new til', function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);
      expect(this.TilStore.get()[0].timestamp).to.be.an.instanceof(Date);
    });
  });

  describe('comments', function () {
    beforeEach(function () {
      this.TilStore.handler(events.ADD_TIL, todoCreate);
      this.commentCreatePayload = {
        comment: {
          tilClientId: 'stubbed-client-id'
        }
      };
    });

    it('adds a comment to til', function () {
      this.TilStore.handler(events.ADD_COMMENT, this.commentCreatePayload);
      expect(this.TilStore.get()[0].comments).to.have.length(1);
    });

    it('makes a server side call to create the til', function () {
      sandbox.stub(this.TilService, 'addComment');
      this.TilStore.handler(events.ADD_COMMENT, this.commentCreatePayload);
      expect(this.TilService.addComment).to.have.been.calledWithMatch(this.commentCreatePayload.comment);
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
