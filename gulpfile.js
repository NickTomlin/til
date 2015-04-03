'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var MANIFEST = {
  js: {
    main: './client/js/app.js',
    all: 'client/js/**/*.js'
  }
};

function buildScript (src, watch) {
  var props = watchify.args;
  props.entries = [src];
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle () {
    util.log('Bundling');
    // todo: find a way to avoid piping to dest here
    // ideally we could tack on any additional streams here
    return bundler.bundle(function () {
        util.log('Finished bundling');
      })
      .on('error', function (err) {
        util.log('Bundle ', err.stack);
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/js'));
  }

  bundler.on('update', rebundle);

  return rebundle();
}

gulp.task('dev', function () {
  buildScript(MANIFEST.js.main, true);
});

gulp.task('js', function () {
  return buildScript(MANIFEST.js.main);
});

gulp.task('jshint', function () {
  gulp.src(MANIFEST.js.all)
    .pipe(jshint());
});

gulp.task('test', ['jshint']);
gulp.task('default', ['dev']);
