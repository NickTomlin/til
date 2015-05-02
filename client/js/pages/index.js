'use strict';

module.exports = function ($scope, $timeout, TilStore, CommentStore, UserStore, TilService) {
  function update () {
    $timeout(function () {
      var tils = TilStore.get();
      $scope.tils = tils.map(function (til) {
        til.user = UserStore.get(til.userId);
        til.comments = CommentStore.getForTil(til.clientId).map(function (comment) {
          comment.user = UserStore.get(comment.userId);
          return comment;
        });
        return til;
      });
    });
  }

  TilStore.addChangeListener(update);
  CommentStore.addChangeListener(update);
  update();

  TilService.getAll();
};
