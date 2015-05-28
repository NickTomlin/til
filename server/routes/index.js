'use strict';

var router = require('express').Router();
var protect = require('../lib/middleware/protect');

router.get('/', protect(), function (req, res) {
  res.render('index', {title: 'What have you learned today?'});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
