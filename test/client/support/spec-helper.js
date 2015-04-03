'use strict'

require('angular');
require('angular-mocks');
global.til = require('til/app');
console.log(global.debug)
global.debug.disable('*');

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;


beforeEach(function () {
  angular.mock.module('til');
  global.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  global.sandbox.reset();
});
