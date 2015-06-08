'use strict';

var router = require('express').Router();

router.use('/authorize', require('./authorize'));
router.use('/til', require('./til'));

module.exports = router;
