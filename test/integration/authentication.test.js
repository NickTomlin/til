'use strict';

var authHelper = require('./helpers/authentication');

describe('authentication', function () {
  describe('with unathenticated users', function () {
    it('prevents a user from accessing the application without logging in', function () {
      browser.ignoreSynchronization = true;
      browser.get('/');
      expect(browser.getTitle()).toContain('Login');
      browser.ignoreSynchronization = false;
    });
  });

  describe('with authenticated users', function () {
    authHelper.loginBeforeEach();

    it('allows a user to access the application', function () {
      browser.get('/');
      expect(browser.getTitle()).not.toContain('login');
    });
  });
});
