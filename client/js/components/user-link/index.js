'use strict';

module.exports = function () {
  return {
    scope: {
      user: '&'
    },
    template: function () {
      return '<a ui-sref="userfeed({username: user().username})">{{user().displayName}}</a>';
    }
  };
};
