'use strict';

var auth = require('../lib/auth');
var router = require('express').Router();

router.get('/auth/github',
  auth.authenticate('github', { scope: [ 'user:email' ] }),
  function noop () {});


router.get('/auth/github/callback', auth.authenticate('github', {
  failureRedirect: '/githubfail' }),
  function(req, res) {
    res.redirect('/');
  });

if (/development|test/.test(process.env.NODE_ENV)) {
  router.post('/auth/basic',
    require('body-parser').urlencoded({extended: false}),
    auth.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/failboat'
    }));
}

router.get('/login', function (req, res) {
  res.render('login', {title: 'Login'});
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
