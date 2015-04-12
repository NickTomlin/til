'use strict';

require('angular');
require('debug').enable('*');

var til = angular.module('til', []);

til.directive('createTil', require('./components/create-til'));
til.directive('tilList', require('./components/til-list'));

til.service('clientActions', require('./actions/client-actions'));
til.service('TilStore', require('./stores/til-store'));
til.service('UserStore', require('./stores/user-store'));

// controller is responsible for setting up data, initializing items on scope
// it should do any direct handling of actions
til.controller('index', function ($scope, TilStore, clientActions) {
  $scope.tils = TilStore.get();

  TilStore.addChangeListener(function () {
    $scope.tils = TilStore.get()
    // since we are acting outside of the typical $scope update cycle,
    // we let angular know to run a diff
    $scope.$digest();
  });
});

module.exports = til;
