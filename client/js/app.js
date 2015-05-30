'use strict';

require('angular');
global.debug = require('debug');
global.debug.enable('*');
var tilApp = angular.module('til', []);

tilApp.directive('createTil', require('./components/create-til'));
tilApp.directive('tilList', require('./components/til-list'));

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
tilApp.run(function (TilStore, AuthenticationStore, UserStore, serverActionCreators) {
  if (global.test) { return; }
  serverActionCreators.addUser({
    id: 1,
    displayName: 'Marty Mcfly'
  });

  serverActionCreators.addUser({
    id: 2,
    displayName: 'Doc Brown'
  });
});

module.exports = tilApp;
