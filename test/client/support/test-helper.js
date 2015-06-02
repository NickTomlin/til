'use strict';

global.test = true;

require('angular');
require('angular-mocks');
require('til/app');
var dispatcher = require('til/dispatcher');

global.helpers = {
  type: function (elem, value) {
    elem.val(value).triggerHandler('input');
  },
  keyup: function (elem, keyCode) {
    // triggerhandler accepts an event name string
    // or an object
    elem.triggerHandler({
      type: 'keyup',
      which: keyCode
    });
  }
};

beforeEach(function () {
  angular.mock.module('til');
  // prevent invariant violations for dispatcher
  // in tests
  global.sandbox.stub(dispatcher, 'waitFor');
});
