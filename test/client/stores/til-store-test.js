'use strict';

var events = require('til/constants').events;

describe('Til Store', function () {
  var TilStore;
  var todoCreate = {
    type: events.ADD_TIL,
    title: 'My great item'
  };

  beforeEach(inject(function (_TilStore_) {
    TilStore = _TilStore_;
  }));

  it('adds an item', function () {
    TilStore.handler(events.ADD_TIL, todoCreate);
    expect(TilStore.get()).to.have.length(1);
  });
});
