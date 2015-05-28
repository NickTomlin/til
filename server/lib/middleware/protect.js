'use strict';

require('../logger');

module.exports = function () {
  return function protect (req, res, next) {
    console.log('PROTECT', req.user, req.session);
    if (req.isAuthenticated()) { return next(); }

    if (req.xhr) {
      res.status(401);
      res.json({
        message: 'Not authenticated'
      });
    } else {
      res.redirect('/login');
    }
  };
};
