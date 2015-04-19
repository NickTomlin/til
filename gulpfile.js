'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var util = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var MANIFEST = {
  js: {
    main: './client/js/app.js',
    all: 'client/js/**/*.js'
  },
  templates: {
    all: 'client/templates/**/*.html'
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
  gulp.watch([MANIFEST.templates.all], ['templates']);
  buildScript(MANIFEST.js.main, true);
});

gulp.task('js', function () {
  return buildScript(MANIFEST.js.main);
});

gulp.task('templates', function () {
  return gulp.src(MANIFEST.templates.all, {})
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('css', function () {
  return gulp.src('./node_modules/bootstrap/dist/css/{bootstrap,bootstrap-theme}.{css,map}')
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['templates', 'css', 'js']);
gulp.task('default', ['build', 'dev']);
