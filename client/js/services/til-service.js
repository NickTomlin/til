'use strict';

module.exports = function ($http, serverActions) {
  this.getAll = function () {
    return $http.get('/api/til').then(function (res) {
      res.data.til.forEach(function (til) {
        serverActions.receiveTil(til);
      })
    });
  };
};
