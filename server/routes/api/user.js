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

router.post('/:id/reset-access-token', function (req, res, next) {
  User
    .findOne({_id: req.params.id})
    .then(function (user) {
      return user
        .assignNewAccessToken()
        .save()
          .then(function (savedUser) {
            res.status(201);
            res.json({
              accessToken: savedUser.accessToken
            });
          });
    })
    .catch(next);
});

module.exports = router;
