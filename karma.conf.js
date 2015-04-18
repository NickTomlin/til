'use strict';

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify', 'phantomjs-shim'],

    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },

    files: [
      'test/shared-helper.js',
      'test/client/support/test-helper.js',
      'test/client/**/*.test.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
