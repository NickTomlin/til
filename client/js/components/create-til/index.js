'use strict';

module.exports = function (clientActionCreators, AuthenticationStore) {
  return {
    link: function ($scope, $elem) {
      $elem.on('keydown', function (event) {
        if (event.which === 13) {
          clientActionCreators.addTIL({
            text: $elem.val(),
            userId: AuthenticationStore.getCurrentUser().id
          });
          $elem.val('');
        }
      });
    }
  };
};
