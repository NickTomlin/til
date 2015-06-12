'use strict';

var authHelper = require('./helpers/authentication');

describe('A users feed', function () {
  authHelper.loginBeforeEach();

  beforeEach(function () {
    browser.get('/docbrown');
  });

  it('displays the users tils', function () {
    expect(element.all(by.repeater('til in tils')).count()).toEqual(2);
  });
});
