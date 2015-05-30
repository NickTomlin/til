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
tilApp.service('UserService', require('./services/user-service'));
tilApp.service('uuid', require('./lib/uuid'));

tilApp.service('TilStore', require('./stores/til-store'));
tilApp.service('UserStore', require('./stores/user-store'));
tilApp.service('AuthenticationStore', require('./stores/authentication-store'));

tilApp.controller('index', require('./pages/index'));

// <BEWARE>
// we need to initialize our stores
// so they are ready for dispatched payloads, like the result of authorizing
// </BEWARE>
tilApp.run(function (TilService, AuthenticationStore, UserStore, UserService) {
  // this is kinda BS, and should be done in a controller
  // when we ui-view all the things
  if (!global.test) {
    UserService.authorize();
  }
});

module.exports = tilApp;
