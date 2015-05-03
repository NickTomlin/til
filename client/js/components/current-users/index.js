'use strict';

module.exports = function () {
  return {
    scope: {
      'users': '=users'
    },
    templateUrl: '/templates/components/current-users/current-users.html',
    link: function ($scope, elem, attrs) {
      console.log('hey', attrs);
    }
  };
};
