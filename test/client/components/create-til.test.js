'use strict';

describe('CreateTilDirective', function () {
  beforeEach(inject(function ($compile, $rootScope, clientActions) {
    this.$scope = $rootScope;
    this.elem = angular.element('<input create-til></input>');
    this.clientActions = clientActions;
    sandbox.spy(clientActions, 'addTIL');
    $compile(this.elem)(this.$scope);

    this.addTIL = function (text) {
      helpers.type(this.elem, text || '');
      helpers.keydown(this.elem, 13);
    }.bind(this);
  }));

  it('calls the submitTil action when enter is pressed', function () {
    var text = 'a great til';
    this.addTIL(text)
    expect(this.clientActions.addTIL).to.have.been.calledWithMatch({
      title: text,
    });
  });

  it('clears the subitTil input when a TIL is submitted', function () {
    this.addTIL('test');
    expect(this.elem.val()).to.eql('');
  });
});
