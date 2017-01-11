const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const cleanCSS = require('gulp-clean-css');

gulp.task('build-js', (done) => {
  exec('nej export ./src/lib/nej/define.js?pro=./src/,./src/index.js -o ./public/javascripts/bundle.js', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }

    console.log(stdout);
    done();
  })
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