'use strict';

module.exports = function ($scope, AuthenticationStore, UserStore) {
  function handleUpdate () {
    $scope.user = UserStore.get(AuthenticationStore.getCurrentUserId());
  }

  AuthenticationStore.addChangeListener(handleUpdate.bind(this));

  handleUpdate();
};
