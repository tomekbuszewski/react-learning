var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

var paths = {
  sass: './app/_sass',
  css: './dist/_css',
  js: './app/**.js',
  jsProd: './dist/index_bundle.js'
};

gulp.task('sass', function() {
  return gulp.src(paths.sass + '/**')
    .pipe(sass())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('webpack', function() {
  return gulp.src(paths.js)
    .pipe(shell('webpack'));
});

gulp.task('watch', ['sass', 'webpack'], function() {
  browserSync.init({
    browser: [],
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['webpack']);
  gulp.watch(paths.jsProd).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
