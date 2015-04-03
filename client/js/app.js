'use strict';

require('angular');
global.debug = require('debug');
global.debug.enable('*');
var til = angular.module('til', []);

til.service('clientActions', require('./actions/client-actions'));
til.service('TilStore', require('./stores/til-store'));

// controller is responsible for setting up data, initializing items on scope
// it should do any direct handling of actions
til.controller('index', function ($scope, TilStore, clientActions) {
  $scope.til = '';
  $scope.tils = TilStore.get();

  // todo: move these out into a directive
  TilStore.addChangeListener(function () {
    $scope.tils = TilStore.get()
  });

  $scope.addTil = function () {
    clientActions.addTIL($scope.til);
    $scope.til = '';
  };
});

module.exports = til;
