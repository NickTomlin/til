'use strict';

var baseStore = require('til/lib/base-store');

describe('baseStore', function () {
  beforeEach(function() {
    this.store = baseStore({handler: sandbox.spy()});
  });

  it('provides a dispatch token', function() {
    expect(this.store.dispatchToken).to.be.ok;
  });

  it('allows implementors to override built in methods', function () {
    function change () {}
    var store = baseStore({
      emitChange: change,
      handler: sandbox.spy()
    });

    expect(store.emitChange).to.eql(change);
  });
});
