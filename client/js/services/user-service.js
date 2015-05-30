'use strict';

module.exports = function ($http, serverActionCreators) {
  this._ENDPOINT = '/api/user';

  this.get = function (id) {
    return $http.get(this._ENDPOINT + '/' + id).then(function (res) {
      serverActionCreators.receiveUser(res.data);
    });
  };

  this.authorize = function () {
    return $http.get('/api/authorize').then(function (res) {
      serverActionCreators.authorizeSuccess(res.data);
    })
    .catch(function (res) {
      serverActionCreators.authorizeFailure(res);
    });
  };
};
