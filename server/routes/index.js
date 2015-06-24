'use strict';

var router = require('express').Router();
var protect = require('../lib/middleware/protect');

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('*', protect(), function (req, res) {
  res.render('index', {title: 'What have you learned today?', accessToken: req.user.accessToken});
});


module.exports = router;
