'use strict'

global.test = true;

require('angular');
require('angular-mocks');
require('til/app');
var dispatcher = require('til/dispatcher');

var chai = require('chai');
var sinon = require('sinon');
global.mochaInject = require('./mocha-inject');
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.sinon = sinon;

global.helpers = {
  type: function (elem, value) {
    elem.val(value).triggerHandler('input');
  },
  keydown: function (elem, keyCode) {
    // triggerhandler accepts an event name string
    // or an object
    elem.triggerHandler({
      type: 'keydown',
      which: keyCode
    });
  }
}

beforeEach(function () {
  angular.mock.module('til');
  global.sandbox = sinon.sandbox.create();
  // prevent invariant violations for dispatcher
  // in tests
  global.sandbox.stub(dispatcher, 'waitFor');
});

afterEach(function () {
  global.sandbox.restore();
});
