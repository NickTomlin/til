'use strict';

var router = require('express').Router();
var logger = require('../lib/logger');
var models = require('../models');

router.get('/authorize', function (req, res) {
  var status = 401;
  var payload = {
    authorized: false
  };

  if (req.isAuthenticated()) {
    payload.authorized = true;
    payload.user = req.user;
    status = 200;
  }

  res
    .status(status)
    .json(payload);
});

router.param('model', function (req, res, next) {
  var model = req.params.model;
  logger.info('not found');
  if (!models[model]) {
    return res
      .status(404)
      .end();
  }
  req.model = models[model];
  next();
});

router.get('/:model', function (req, res, next) {
  req.model
    .find({})
    .exec(function (err, result) {
      if (err) { return next(err); }
      var data = {};
      data[req.model.modelName] = result;
      res.json(data);
    });
});

router.put('/til/comments', function (req, res, next) {
  models.til.findOne({_id: req.body.tilId}, function (findErr, til) {
    if (findErr) { return next(findErr); }
    if (!til) { return res.status(404).end(); }

    logger.info('Updating comment for', til, 'with', req.body);

    til.comments.push(req.body);
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

router.post('/:model', function (req, res) {
  var modelName = req.model.modelName;
  var clientId = req.body[modelName] && req.body[modelName].clientId;

  new req.model(req.body)
    .save(function (err, result) {
      var resp = {};
      if (err) {
        logger.info('TIL error %s', err);
        res.status(400);
        // simulate delay to showcase "optimistic" fallbacks
        return setTimeout(function () {
          res.json({
            errors: err.errors,
            clientId: req.body.clientId
          });
        }, 900);
      }

      if (clientId) {
        result.clientId = clientId;
      }

      resp[modelName] = result;

      res.status(201);
      res.json(resp);
    });
});

module.exports = router;
