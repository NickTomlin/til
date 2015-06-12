'use strict';

global.angular = require('angular'); // attach for integration tests
global.debug = require('debug');
global.debug.enable('*');
var tilApp = angular.module('til', [require('angular-ui-router')]);

tilApp.directive('createTil', require('./components/create-til'));
tilApp.directive('tilList', require('./components/til-list'));
tilApp.directive('userLink', require('./components/user-link'));

tilApp.service('clientActionCreators', require('./actions/client-action-creators'));
tilApp.service('serverActionCreators', require('./actions/server-action-creators'));
tilApp.directive('siteNavigation', require('./components/navigation'));

tilApp.service('TilService', require('./services/til-service'));
tilApp.service('UserService', require('./services/user-service'));
tilApp.service('uuid', require('./lib/uuid'));

tilApp.service('TilStore', require('./stores/til-store'));
tilApp.service('UserStore', require('./stores/user-store'));
tilApp.service('AuthenticationStore', require('./stores/authentication-store'));

tilApp.controller('HomeController', require('./pages/home'));
tilApp.controller('SettingsController', require('./pages/settings'));

tilApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('');

  $locationProvider
    .html5Mode({enabled: true, requireBase: false});

  // we register "pages" here for simplicity's sake
  // eventually, we may need to move these out into their own
  // modules to keep things maintainable.
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'templates/pages/home/home.template.html'
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsController',
      templateUrl: 'templates/pages/settings/settings.template.html'
    });
});

// <BEWARE>
// we need to initialize our stores
// so they are ready for dispatched payloads, like the result of authorizing.
//
// this means injecting them but not actually using them :|
// </BEWARE>
tilApp.run(function (TilService, AuthenticationStore, UserStore, UserService) {
  // this is kinda BS, and should be done in a controller
  // when we ui-view all the things
  if (!global.test) {
    UserService.authorize();
  }
});

module.exports = tilApp;
