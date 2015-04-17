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

til.controller('index', function ($scope, $timeout, TilStore, CommentStore, UserStore) {
  function update () {
    $timeout(function () {
      var tils = TilStore.get();
      $scope.tils = tils.map(function (til) {
        til.user = UserStore.get(til.userId);
        til.comments = CommentStore.getForTil(til.id).map(function (comment) {
          comment.user = UserStore.get(comment.userId);
          return comment;
        });
        return til;
      });
    });
  }

  TilStore.addChangeListener(update);
  CommentStore.addChangeListener(update);
  update();
});

module.exports = til;
