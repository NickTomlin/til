'use strict';

var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
global.expect = chai.expect;
global.sinon = sinon;

beforeEach(function () {
  global.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  global.sandbox.restore();
});
