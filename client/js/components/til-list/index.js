'use strict';

module.exports = function () {
  return {
    scope: {
      'tils': '&tils'
    },
    controller: function ($scope, AuthenticationStore, clientActionCreators) {
      $scope.addComment = function (event, til) {
        if (event.which === 13) {
          clientActionCreators.addComment({
            userId: AuthenticationStore.getCurrentUserId(),
            text: event.target.value,
            tilClientId: til.clientId
          });
          event.target.value = '';
        }
      };
    },
    templateUrl: '/templates/components/til-list/til-list.html'
  };
};
