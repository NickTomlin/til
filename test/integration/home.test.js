'use strict';

var authHelper = require('./helpers/authentication');

describe('home page', function () {
  authHelper.loginBeforeEach();

  it('allows users to create tils', function () {
    $('create-til input')
      .sendKeys('Integration tests are useful')
      .sendKeys(protractor.Key.ENTER);

    element.all(by.repeater('til in tils')).then(function (elems) {
      expect(elems[elems.length - 1].getText()).toMatch(/Integration tests are useful/);
    });
  });
});
