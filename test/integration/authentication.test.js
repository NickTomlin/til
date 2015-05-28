'use strict';

var authHelper = require('./helpers/authentication');

describe('authentication', function () {
  describe('with unathenticated users', function () {
    it('prevents a user from accessing the application without logging in', function () {
      browser.get('/');
      expect(browser.getTitle()).toContain('Login');
    });
  });

  describe('with authenticated users', function () {
    // protractor uses jasmine (by default)
    // which does not support a 'before' block
    // so we dirty check for initialization
    // https://github.com/angular/protractor/issues/346
    var loggedIn;
    beforeEach(function () {
      if (loggedIn) { return; }
      loggedIn = true;

      authHelper.login();
    });

    it('allows a user to access the application', function () {
      browser.get('/');
      expect(browser.getTitle()).not.toContain('login');
    });
  });
});
