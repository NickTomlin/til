'use strict';

module.exports = function ($http, serverActionCreators) {
  this._ENDPOINT = '/api/til';

  this.add = function (til) {
    return $http.post(this._ENDPOINT, til)
      .then(function (res) {
        serverActionCreators.addTilSuccess(res.data);
      })
      .catch(function (res) {
        serverActionCreators.receiveTilsError(res.data);
      });
  };

  this.addComment = function (comment) {
    return $http.put(this._ENDPOINT + '/comments', comment);
  };

  this.getAll = function () {
    return $http.get(this._ENDPOINT).then(function (res) {
      serverActionCreators.receiveTils(res.data);
    });
  };
};
