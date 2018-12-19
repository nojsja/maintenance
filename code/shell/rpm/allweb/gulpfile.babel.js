require('@babel/polyfill');
// import gulp
const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    babel = require('gulp-babel'),
    uglify = require("gulp-uglify");

// define dir
const cssDir = 'origin/css',
    jsDir = 'origin/js',
    htmlDir = 'origin/htm',
    originDir = 'origin',
    distDir = 'origin/node-express-react';

// define path
const cssSrc = `${cssDir}/*.css`,
    jsSrc = `${jsDir}/*.js`,
    htmlSrc  = `${htmlDir}/*.htm`,
    jsDist = "dist/js";

// import module
const fileMap = require('./conf/fileMap.js');

// JS file + hash => rev-manifest.json
gulp.task('revJs', function(){
  const jsSources = [];
  fileMap.forEach(function (value, key, map) {
    jsSources.push(`${originDir}/${key}/${value}`);
  });
  return gulp.src(jsSources, {base: `${originDir}/node-express-react`})
    .pipe(babel({
      "presets": ["@babel/preset-env"],
      "plugins": ["@babel/plugin-transform-runtime"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${distDir}`))
});

// start task
gulp.task('prod-build', function (done) {
    runSequence(
        ['revJs'],
        done);
});


gulp.task('build', ['prod-build']);
