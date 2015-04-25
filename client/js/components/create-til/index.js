'use strict';

module.exports = function (clientActions, AuthenticationStore) {
  return {
    link: function ($scope, $elem) {
      $elem.on('keydown', function (event) {
        if (event.which === 13) {
          clientActions.addTIL({
            text: $elem.val(),
            userId: AuthenticationStore.getCurrentUser().id
          });
          $elem.val('');
        }
      });
    }
  };
};
