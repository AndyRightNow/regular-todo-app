const gulp = require('gulp');
const run = require('gulp-run');
const path = require('path');
const cleanCSS = require('gulp-clean-css');

gulp.task('build-js', () => {
  return run('nej export define.js?pro=./src/,./src/index.js -o ./public/javascripts/bundle.js').exec();
});

gulp.task('build-styles', () => {
  return gulp.src(path.resolve('./', 'src', 'styles', '*.*'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(path.resolve('./', 'public', 'stylesheets')));
});

gulp.task('default', ['build-js', 'build-styles']);

gulp.task('dev', () => {
  gulp.watch('./src/**/*.js', ['build-js']);
  gulp.watch('./src/**/*.css', ['build-styles']);
});