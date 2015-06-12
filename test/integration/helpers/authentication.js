'use strict';


function login(email, password) {
  browser.ignoreSynchronization = true;
  email = email || 'marty@mcfly.com';
  password = password || 'doesnotmatter';
  browser.get('/login');

  $('[name="email"]').sendKeys(email);
  $('[name="password"]').sendKeys(password);
  $('button[type="submit"]').click();
  browser.ignoreSynchronization = false;
}

function logout() {
  browser.manage().deleteAllCookies();
}

function loginBeforeEach() {
  // protractor uses jasmine (by default)
  // which does not support a 'before' block
  // so we dirty check for initialization
  // https://github.com/angular/protractor/issues/346
  var loggedIn;
  beforeEach(function () {
    if (loggedIn) { return; }
    loggedIn = true;

    login();
  });
}

module.exports = {
  login: login,
  logout: logout,
  loginBeforeEach: loginBeforeEach
};
