'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
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

module.exports = router;
