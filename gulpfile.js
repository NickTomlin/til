'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var browserify = require('browserify');
var util = require('gulp-util');
var shell = require('gulp-shell');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

var MANIFEST = {
  js: {
    clientMain: './client/js/app.js',
    clientAll: 'client/js/**/*.js',
    clientVendor: ['angular', 'debug'],
    serverAll: 'server/**/*.js',
    spec: 'test/**/*.js'
  },
  css: {
    main: './client/css/app.css',
    vendor: './node_modules/bootstrap/dist/css/{bootstrap,bootstrap-theme}.{css,map}'
  },
  images: {
    all: './client/img/**/*'
  },
  templates: {
    all: 'client/js/**/*.html'
  }
};

function buildScript (src, watch) {
  var props = watchify.args;
  props.entries = [src];
  props.external = MANIFEST.js.clientVendor;
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle () {
    util.log('Bundling');
    // todo: find a way to avoid piping to dest here
    // ideally we could tack on any additional streams here
    return bundler.bundle()
      .on('end', function () {
        util.log('Finished bundling');
      })
      .on('error', function (err) {
        util.log('Bundle ', err, err.stack);
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/js'));
  }

  bundler.on('update', rebundle);

  return rebundle();
}

function buildVendor () {
  return browserify()
          .require(MANIFEST.js.clientVendor)
          .bundle()
          .pipe(source('vendor.js'))
}

gulp.task('dev', function () {
  nodemon({
    script: 'bin/www',
    ext: 'js',
    watch: 'server'
  });
  gulp.watch([MANIFEST.js.clientAll, MANIFEST.js.serverAll, MANIFEST.js.spec], ['lint']);

  gulp.watch([MANIFEST.images.all], ['assets']);
  gulp.watch([MANIFEST.css.main], ['css']);
  gulp.watch([MANIFEST.templates.all], ['templates']);

  buildScript(MANIFEST.js.clientMain, true);
});

gulp.task('js', function () {
  return buildScript(MANIFEST.js.clientMain);
});

gulp.task('js:vendor', function () {
  return buildVendor()
          .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', shell.task([
  './node_modules/.bin/eslint .'
]));

gulp.task('templates', function () {
  return gulp.src(MANIFEST.templates.all, {})
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('assets', function () {
  gulp.src(MANIFEST.images.all)
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('css', function () {
  return gulp.src([MANIFEST.css.main, MANIFEST.css.vendor])
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['templates', 'css', 'js:vendor', 'js']);
gulp.task('default', ['dev']);
