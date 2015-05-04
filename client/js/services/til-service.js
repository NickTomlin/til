'use strict';

module.exports = function ($http, serverActionCreators) {
  this.getAll = function () {
    return $http.get('/api/til').then(function (res) {
      res.data.til.forEach(function (til) {
        serverActionCreators.receiveTil(til);
      });
    });
  };
};
