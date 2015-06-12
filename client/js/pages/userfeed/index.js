'use strict';

module.exports = function ($scope, $stateParams, TilStore, UserStore, TilService) {
  function handleUpdate () {
    $scope.user = UserStore.getByUsername($stateParams.username);
    if (!$scope.user) { return; }
    $scope.tils = TilStore.getTilsForUser($scope.user._id);
  }

  TilStore.addChangeListener(handleUpdate.bind(this));
  UserStore.addChangeListener(handleUpdate.bind(this));

  TilService.getAll();
  handleUpdate();
};
