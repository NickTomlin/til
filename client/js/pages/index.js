'use strict';

module.exports = function ($scope, $timeout, TilStore, TilService) {
  function update () {
    $timeout(function () {
      $scope.tils = TilStore.get();
    });
  }

  TilStore.addChangeListener(update);
  update();

  TilService.getAll();
};
