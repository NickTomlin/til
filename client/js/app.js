'use strict';

require('angular');
global.debug = require('debug');
global.debug.enable('*');
var tilApp = angular.module('til', []);

tilApp.directive('createTil', require('./components/create-til'));
tilApp.directive('tilList', require('./components/til-list'));

tilApp.service('clientActions', require('./actions/client-actions'));
tilApp.service('serverActions', require('./actions/server-actions'));
tilApp.service('TilStore', require('./stores/til-store'));
tilApp.service('CommentStore', require('./stores/comment-store'));
tilApp.service('UserStore', require('./stores/user-store'));
tilApp.service('AuthenticationStore', require('./stores/authentication-store'));

tilApp.controller('index', require('./pages/index'));

// !! handwaving
// we preload the application with a user
// our stores must be injected to attach listeners, so we include them here
tilApp.run(function (TilStore, UserStore, CommentStore, AuthenticationStore, serverActions, clientActions) {
  if (global.test) { return; }
  serverActions.addUser({
    id: 1,
    displayName: 'Nick Tomlin'
  });

  serverActions.addUser({
    id: 2,
    displayName: 'Ember Bob'
  });

  serverActions.receiveTil({
    userId: 1,
    text: 'Angular and Flux work together',
    clientId: 1234
  });

  serverActions.receiveTil({
    userId: 2,
    text: 'It\'s all in your mind',
    clientId: 5678
  });

  clientActions.addComment({
    tilId: TilStore.get()[0].clientId,
    userId: 2,
    text: 'But what do you think about ember?'
  });

  clientActions.addComment({
    tilId: TilStore.get()[1].clientId,
    userId: 1,
    text: 'Deep.'
  });
});

module.exports = tilApp;
