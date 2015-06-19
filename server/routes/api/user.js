'use strict';

var User = require('../../models/user');
var router = require('express').Router();

router.get('/:id', function (req, res, next) {
  User
    .findOne({_id: req.params.id})
    .lean()
    .exec(function (err, result) {
      if (err) { return next(err); }
      res.json(result);
    });
});

module.exports = router;
