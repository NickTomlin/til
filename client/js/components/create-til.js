'use strict';

module.exports = function (clientActions) {
  return {
    link: function ($scope, $elem) {
      $elem.on('keydown', function (event) {
        if (event.which === 13) {
          clientActions.addTIL({
            title: $elem.val()
          });
          $elem.val('');
        }
      });
    }
  }
};
