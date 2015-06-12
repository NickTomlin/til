'use strict';

module.exports = function ($scope, $timeout, UserStore, TilStore, TilService) {
  function update () {
    $timeout(function () {
      $scope.tils = TilStore.get();
      $scope.users = UserStore.all();
    });
  }

  TilStore.addChangeListener(update);
  UserStore.addChangeListener(update);
  update();

  TilService.getAll();
};
