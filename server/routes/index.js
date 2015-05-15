'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
  res.render('index', {});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
