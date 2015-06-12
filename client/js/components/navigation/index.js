'use strict';

module.exports = function (UserStore, AuthenticationStore) {
  return {
    scope: {},
    templateUrl: 'templates/components/navigation/navigation.template.html',
    controller: function ($scope) {
      console.log('navigation controller', $scope, AuthenticationStore.getCurrentUserId());
    }
  }
};
