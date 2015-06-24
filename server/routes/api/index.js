'use strict';

var router = require('express').Router();
var auth = require('../../lib/auth');

router.use(auth.authenticate('bearer'));
router.use('/authorize', require('./authorize'));
router.use('/til', require('./til'));
router.use('/user', require('./user'));

module.exports = router;
