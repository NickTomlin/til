'use strict';

var router = require('express').Router();
var logger = require('../../lib/logger');
var Til = require('../../models').til;

router.get('/', function (req, res, next) {
  Til
    .find({})
    .populate('user')
    .lean()
    .exec(function (err, result) {
      if (err) { return next(err); }
      // the client side expects all discrete objects
      // to exist on the top level of the payload
      var data = result.reduce(function (results, til) {
        results.user.push(til.user);
        til.userId = til.user._id;
        delete til.user;
        results.til.push(til);
        return results;
      }, {
        til: [],
        user: []
      });

      res.json(data);
    });
});

router.put('/comments', function (req, res, next) {
  Til
  .findOne({_id: req.body.tilId}, function (findErr, til) {
    if (findErr) { return next(findErr); }
    if (!til) { return res.status(404).end(); }

    logger.info('Updating comment for', til, 'with', req.body);

    til.comments.push({
      text: req.body.text,
      userId: req.body.userId
    });

    til.save(function (err, result) {
      if (err) { return next(err); }

      res
        .status(201)
        .json({
          til: result
        });
    });
  });
});

router.post('/', function (req, res) {
  var clientId = req.body.clientId;

  new Til(req.body)
    .save(function (err, document) {
      var til;
      if (err) {
        logger.info('TIL error %s', err);
        res.status(400);
        return res.json({
          errors: err.errors,
          clientId: clientId
        });
      }

      til = document.toObject();
      if (clientId) {
        til.clientId = clientId;
      }
      til.userId = til.user;

      res.status(201);
      res.json({
        til: til
      });
    });
});

module.exports = router;
