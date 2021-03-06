'use strict';

var events = require('til/constants').events;
var _ = require('lodash');

describe('Til Store', function () {
  beforeEach(easyInject('TilStore TilService UserStore', function () {
    this.users = {
      'my-user-id': {
        displayName: 'my-user',
        _id: 'my-user-id'
      },
      'not-user-id': {
        displayName: 'not-user',
        _id: 'not-user-id'
      }
    };

    sandbox.stub(this.UserStore, 'get', function (id) {
      return this.users[id];
    }.bind(this));

    sandbox.stub(this.TilService, 'add');
    this.til = {
      text: 'test'
    };

    this.addTil = function (properties) {
      var tilProps = _.merge({}, {
        type: events.ADD_TIL,
        til: {
          text: 'My great item',
          userId: 'my-user-id'
        }
      }, properties || {});

      this.TilStore.handler(tilProps.type, tilProps);
    };
  }));

  describe('getTilsForUser()', function () {
    it('returns the tils for a user', function () {
      this.addTil();
      this.addTil();
      this.addTil({
        til: {userId: 'not-user-id'}
      });

      expect(this.TilStore.getTilsForUser('my-user-id').length).to.eql(2);
    });
  });

  describe('tils', function () {
    it('adds an item', function () {
      this.addTil();
      expect(this.TilStore.get()).to.have.length(1);
    });

    it('makes a server side call to create the til', function () {
      this.addTil();
      expect(this.TilService.add).to.have.been.calledWithMatch({
        text: 'My great item'
      });
    });

    it('adds a clientId to new til', function () {
      this.addTil();
      expect(this.TilStore.get()[0]).to.have.property('clientId');
    });

    it('adds a timeStamp to new til', function () {
      this.addTil();
      expect(this.TilStore.get()[0].timestamp).to.be.an.instanceof(Date);
    });

    describe('receive tils', function () {
      beforeEach(function () {
        this.payload = {
          til: [
          {_id: 'server-id-one', text: 'test', userId: 'my-user-id'},
          {_id: 'server-id-two', text: 'test2', userId: 'my-user-id'}
        ],
        user: [{_id: 'foo'}]};
      });

      it('adds multiple tils', function () {
        this.TilStore.handler(events.RECEIVE_TILS, this.payload);
        expect(this.TilStore.get()).to.have.length(2);
      });

      it('replaces existing tils, instead of adding new ones', function () {
        this.addTil();
        var successfulTil = _.merge({}, this.TilStore.get()[0], {_id: 'server-id-three'});
        this.TilStore.handler(events.ADD_TIL_SUCCESS, {til: successfulTil});

        this.payload.til[0] = _.omit(successfulTil, 'clientId');
        this.TilStore.handler(events.RECEIVE_TILS, this.payload);

        expect(this.TilStore.get()).to.have.length(2);
      });
    });

    describe('ADD_TIL_SUCCESS', function () {
      it('replaces existing tils, instead of adding new ones', function () {
        this.addTil();
        var addedTil = this.TilStore.get()[0];

        this.TilStore.handler(events.ADD_TIL_SUCCESS, {
          til: _.extend({}, addedTil, {
            _id: 'server-side-id'
          })
        });

        expect(this.TilStore.get()[0]._id).to.eql('server-side-id');
      });
    });
  });

  describe('comments', function () {
    beforeEach(function () {
      this.addTil();
      this.commentCreatePayload = {
        comment: {
          tilClientId: this.TilStore.get()[0].clientId
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
      expect(this.TilStore.get()[0]).to.have.property('clientId');
    });
  });

  describe('error handling', function () {
    beforeEach(function () {
      this.tilError = {
        errors: {
          text: {
            message: 'Invalid reason'
          }
        }
      };
    });

    it('marks tils with error', function () {
      this.addTil();
      this.tilError.clientId = this.TilStore.get()[0].clientId;
      this.TilStore.handler(events.RECEIVE_TILS_ERROR, this.tilError);
      expect(this.TilStore.get()[0]).to.have.property('errors');
    });
  });

});
