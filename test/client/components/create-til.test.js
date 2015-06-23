'use strict';

describe('CreateTilDirective', function () {
  beforeEach(easyInject('$compile $rootScope clientActionCreators', function () {
    this.elem = angular.element('<create-til></create-til>');
    sandbox.stub(this.clientActionCreators, 'addTIL');
    this.$compile(this.elem)(this.$rootScope);

    this.input = this.elem.find('input');

    this.addTIL = function (text) {
      helpers.type(this.input, text || '');
      helpers.keyup(this.input, 13);
    }.bind(this);
  }));

  it('calls the submitTil action when enter is pressed', function () {
    var text = 'a great til';
    this.addTIL(text);
    expect(this.clientActionCreators.addTIL).to.have.been.calledWithMatch({
      text: text
    });
  });

  it('clears the subitTil input when a TIL is submitted', function () {
    this.addTIL('test');
    expect(this.input.val()).to.eql('');
  });
});
