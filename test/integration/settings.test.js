'use strict';

var authHelper = require('./helpers/authentication');

describe('Settings Page', function () {
  authHelper.loginBeforeEach();

  beforeEach(function () {
    browser.get('/settings');
  });

  it('displays authorizations for a user', function () {
    expect(element.all(by.repeater('authorization in user.authorizations')).count()).toEqual(1);
  });
});
