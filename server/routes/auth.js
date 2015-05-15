'use strict';

var auth = require('../lib/auth');
var router = require('express').Router();

router.get('/github',
  auth.authenticate('github', { scope: [ 'user:email' ] }),
  function noop () {});

router.get('/github/callback',
  auth.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
