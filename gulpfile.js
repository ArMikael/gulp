var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var logger = require('gulp-logger');

var paths = {
  js: ['./dev/js/*.js', '!.dev/js/lib/*.js'],
  css: './dev/css/*.css',
  img: ['./dev/img/*.jpg', './dev/img/*.png']
};

gulp.task('mincss', function() {
  return gulp.src(paths.css)
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./prod/css'));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
   .pipe(logger({
      before: 'Starting JS...',
      after: 'JS complete!',
      showChange: true
  }))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./prod/js'));
});

gulp.task('webserver', function() {
  gulp.src('./prod')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8022
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['mincss']);
});


gulp.task('default', ['mincss', 'js', 'webserver', 'watch']);