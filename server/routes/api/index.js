'use strict';

var router = require('express').Router();

router.use('/authorize', require('./authorize'));
router.use('/til', require('./til'));
router.use('/user', require('./user'));

module.exports = router;
