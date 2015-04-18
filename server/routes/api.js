'use strict';

var router = require('express').Router();
var models = require('../models');

router.param('model', function (req, res, next) {
  var model = req.params.model;
  if (!models[model]) {
    return res
      .status(403)
      .end();
  }
  req.model = models[model];
  next();
});

router.get('/:model', function (req, res, next) {
  req.model.find({}, function (err, result) {
    res.json(result);
  });
});

router.post('/:model/:id', function (req, res, next) {
  req.model.find({})
});

module.exports = router;
