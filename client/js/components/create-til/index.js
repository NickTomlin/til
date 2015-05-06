'use strict';

module.exports = function (clientActionCreators, AuthenticationStore) {
  return {
    scope: {},
    template: '<input ng-keyup="addTil($event)" class="form-control">',
    link: function ($scope) {
      $scope.addTil = function ($event) {
        if ($event.which === 13) {
          clientActionCreators.addTIL({
            text: $event.currentTarget.value,
            userId: AuthenticationStore.getCurrentUser().id
          });
          $event.currentTarget.value = '';
        }
      };
    }
  };
};
