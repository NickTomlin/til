'use strict';

var events = require('til/constants').events;

describe('Til Store', function () {
  var todoCreate = {
    type: events.ADD_TIL,
    title: 'My great item'
  };

  beforeEach(inject(function (_TilStore_) {
    void function () {};
    this.TilStore = _TilStore_;
  }));

  it('adds an item', function () {
    this.TilStore.handler(events.ADD_TIL, todoCreate);
    expect(this.TilStore.get()).to.have.length(1);
  });
});
