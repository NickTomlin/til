'use strict';

module.exports = function () {
  return {
    scope: {
      'tils': '=tils'
    },
    controller: function ($scope, AuthenticationStore, clientActions) {
      $scope.addComment = function (event, til) {
        if (event.which === 13) {
          clientActions.addComment({
            userId: AuthenticationStore.getCurrentUser().id,
            text: event.target.value,
            tilId: til.clientId
          });
          event.target.value = '';
        }
      };
    },
    templateUrl: '/templates/til-list.html'
  };
};
