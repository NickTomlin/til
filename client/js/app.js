'use strict';

require('angular');
require('debug').enable('*');
var til = angular.module('til', []);

til.directive('createTil', require('./components/create-til'));
til.directive('tilList', require('./components/til-list'));

til.service('clientActions', require('./actions/client-actions'));
til.service('serverActions', require('./actions/server-actions'));
til.service('TilStore', require('./stores/til-store'));
til.service('UserStore', require('./stores/user-store'));
til.service('AuthenticationStore', require('./stores/authentication-store'));

// !! handwaving
// we preload the application with a user
// our stores must be injected to attach listeners, so we include them here
til.run(function (TilStore, UserStore, AuthenticationStore, serverActions) {
  if (global.test) return;
  serverActions.addUser({
    id: 1,
    displayName: 'Nick Tomlin'
  });

  serverActions.addUser({
    id: 2,
    displayName: 'Bob Bobbins'
  });

  serverActions.receiveTil({
    id: 1,
    title: 'Angular and Flux can make a good pairing',
    user: 1
  })
});

// controller is responsible for setting up data, initializing items on scope
// it should do any direct handling of actions
til.controller('index', function ($scope, TilStore) {
  $scope.tils = TilStore.get();

  TilStore.addChangeListener(function () {
    $scope.tils = TilStore.get()
    // since we are acting outside of the typical $scope update cycle,
    // we let angular know to run a diff
    $scope.$digest();
  });
});

module.exports = til;
