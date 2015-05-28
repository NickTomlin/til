'use strict';

module.exports = {
  login: function (email, password) {
    email = email || 'marty@mcfly.com';
    password = password || 'doesnotmatter';
    browser.get('/login');

    $('[name="email"]').sendKeys(email);
    $('[name="password"]').sendKeys(password);
    $('button[type="submit"]').click();
  },
  logout: function () {
    browser.manage().deleteAllCookies();
  }
};
