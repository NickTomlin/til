'use strict';

module.exports = function (clientActionCreators, AuthenticationStore) {
  return {
    scope: {},
    template: '<input ng-keyup="addTil($event)" class="form-control">',
    link: function ($scope) {
      $scope.addTil = function ($event) {
        if ($event.which === 13) {
          var input = $event.target;
          clientActionCreators.addTIL({
            text: input.value,
            userId: AuthenticationStore.getCurrentUser().id
          });
          input.value = '';
        }
      };
    }
  };
};
