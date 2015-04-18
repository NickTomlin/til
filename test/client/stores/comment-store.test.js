'use strict';

var events = require('til/constants').events;

describe('commentStore', function () {
  beforeEach(inject(function(CommentStore, TilStore) {
    this.CommentStore = CommentStore;
    this.TilStore = TilStore;

    sandbox.stub(this.TilStore, 'get');
  }));

  it('fetches all comments for a TIL', function () {
    this.CommentStore.handler(
      events.ADD_COMMENT, {
      comment: {
        tilId: 1,
        text: 'This is great!',
        user: 1
      }
    });
    var comments = this.CommentStore.getForTil(1);
    expect(comments).to.have.length(1);
  });
});
