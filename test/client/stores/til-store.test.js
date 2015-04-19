'use strict';

var events = require('til/constants').events;

describe('Til Store', function () {
  var todoCreate = {
    type: events.ADD_TIL,
    til: {
      clientId: 'my-client-id',
      title: 'My great item'
    }
  };

  var tilError = {
    clientId: todoCreate.til.clientId,
    errors: {
      text: {
        message: 'Invalid reason'
      }
    }
  };

  beforeEach(inject(function (_TilStore_) {
    this.TilStore = _TilStore_;
  }));

  it('adds an item', function () {
    this.TilStore.handler(events.ADD_TIL, todoCreate);
    expect(this.TilStore.get()).to.have.length(1);
  });

  it('marks tils with error', function () {
    this.TilStore.handler(events.ADD_TIL, todoCreate);
    this.TilStore.handler(events.RECEIVE_TIL_ERROR, tilError);
    expect(this.TilStore.get()[0]).to.have.property('errors');
  });
});
