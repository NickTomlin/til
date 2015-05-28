'use strict';

var JOB_NAME = 'TIL';

exports.config = {
  specs: [
    'test/integration/**/*.test.js'
  ],

  capabilities: {
    browserName: 'chrome',
    name: JOB_NAME
  },

  baseUrl: 'http://localhost:3000/',

  directConnect: true,

  framework: 'jasmine',

  allScriptsTimeout: 20000,

  getPageTimeout: 20000,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 360000
  },

  onPrepare: function() {}
};

