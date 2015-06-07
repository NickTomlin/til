'use strict';

var authHelper = require('./helpers/authentication');

describe('home page', function () {
  authHelper.loginBeforeEach();

  it('allows users to create tils', function () {
    $('create-til input')
      .sendKeys('Integration tests are useful')
      .sendKeys(protractor.Key.ENTER);

    element.all(by.repeater('til in tils')).then(function (elems) {
      expect(elems[0].getText()).toMatch(/Integration tests are useful/);
    });
  });

  it('allows users to comment on tils', function () {
    element.all(by.repeater('til in tils')).last()
      .element(by.tagName('input'))
      .sendKeys('This is a test comment')
      .sendKeys(protractor.Key.ENTER);

    expect(element(by.cssContainingText('p', 'This is a test comment')).isPresent()).toBe(true);
  });
});
