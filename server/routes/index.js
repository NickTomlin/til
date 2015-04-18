'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
  res.render('index', {title: 'title'});
});

module.exports = router;
