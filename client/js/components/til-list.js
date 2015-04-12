'use strict';

module.exports = function () {
  return {
    scope: {
      'tils': '=tils'
    },
    template: [
      '<ul>',
        '<li ng-repeat="til in tils" till-list-item{{til}}>{{til.title}}</li>',
      '</ul>'
    ].join('')
  }
};
