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

  allScriptsTimeout: 10000,

  getPageTimeout: 3000,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 5000
  },

  onPrepare: function() {}
};

