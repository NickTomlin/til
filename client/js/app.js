'use strict';

require('angular');
global.debug = require('debug');
global.debug.enable('*');
var tilApp = angular.module('til', []);

tilApp.directive('createTil', require('./components/create-til'));
tilApp.directive('tilList', require('./components/til-list'));
tilApp.directive('currentUsers', require('./components/current-users'));

tilApp.service('clientActionCreators', require('./actions/client-action-creators'));
tilApp.service('serverActionCreators', require('./actions/server-action-creators'));

tilApp.service('TilService', require('./services/til-service'));
tilApp.service('uuid', require('./lib/uuid'));


tilApp.service('TilStore', require('./stores/til-store'));
tilApp.service('UserStore', require('./stores/user-store'));
tilApp.service('AuthenticationStore', require('./stores/authentication-store'));

tilApp.controller('index', require('./pages/index'));

// !! handwaving
// we preload the application with a user
// our stores must be injected to attach listeners, so we include them here
tilApp.run(function (TilStore, UserStore, AuthenticationStore, serverActionCreators, clientActionCreators) {
  if (global.test) { return; }
  serverActionCreators.addUser({
    id: 1,
    displayName: 'Marty Mcfly'
  });

  serverActionCreators.addUser({
    id: 2,
    displayName: 'Doc Brown'
  });

  serverActionCreators.receiveTil({
    userId: 1,
    text: 'Biff was always a jerk.',
    clientId: 1234
  });

  serverActionCreators.receiveTil({
    userId: 2,
    text: 'Time Travel is possible!',
    clientId: 5678
  });

  clientActionCreators.addComment({
    tilClientId: TilStore.get()[0].clientId,
    userId: 2,
    text: 'Gah! Don\'t interfere with the past!'
  });

  clientActionCreators.addComment({
    tilClientId: TilStore.get()[0].clientId,
    userId: 1,
    text: 'Well you would too if you had parents like mine.'
  });
});

module.exports = tilApp;
