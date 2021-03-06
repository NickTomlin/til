'use strict';

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['browserify', 'source-map-support', 'phantomjs-shim', 'mocha'],

    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },

    files: [
      'test/shared-helper.js',
      'test/client/support/test-helper.js',
      'test/client/**/*.test.js'
    ],

    reporters: ['progress'],

    browserify: {
      debug: true
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
