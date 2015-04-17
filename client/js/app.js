'use strict';

require('angular');
global.debug = require('debug');
global.debug.enable('*');
var til = angular.module('til', []);

til.directive('createTil', require('./components/create-til'));
til.directive('tilList', require('./components/til-list'));

til.service('clientActions', require('./actions/client-actions'));
til.service('serverActions', require('./actions/server-actions'));
til.service('TilStore', require('./stores/til-store'));
til.service('CommentStore', require('./stores/comment-store'));
til.service('UserStore', require('./stores/user-store'));
til.service('AuthenticationStore', require('./stores/authentication-store'));

// !! handwaving
// we preload the application with a user
// our stores must be injected to attach listeners, so we include them here
til.run(function (TilStore, UserStore, CommentStore, AuthenticationStore, serverActions, clientActions) {
  if (global.test) return;
  serverActions.addUser({
    id: 1,
    displayName: 'Nick Tomlin'
  });

  serverActions.addUser({
    id: 2,
    displayName: 'Ember Bob'
  });

  clientActions.addTIL({
    userId: 1,
    title: 'Angular and Flux work together'
  });

  clientActions.addTIL({
    userId: 2,
    title: 'It\'s all in your mind'
  });

  clientActions.addComment({
    tilId: TilStore.get()[0].id,
    userId: 2,
    text: 'But what do you think about ember?'
  });

  clientActions.addComment({
    tilId: TilStore.get()[1].id,
    userId: 1,
    text: 'Deep.'
  });
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
