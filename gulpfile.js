var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var hash = require('gulp-hash-filename');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var logger = require('gulp-logger');
var debug = require('gulp-debug');
var gutil = require('gulp-util');


var paths = {
  js: ['./dev/js/*.js', '!.dev/js/lib/*.js'],
  css: './dev/css/*.css',
  img: ['./dev/img/*.jpg', './dev/img/*.png']
};

gulp.task('mincss', function() {
  return gulp.src(paths.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./prod/css'))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
      console.log('Efficiency: ' + details.stats.efficiency);
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(gutil.env.path));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
  .pipe(debug())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./prod/js'))
  .pipe(uglify({mangle: false}))
  //  .pipe(logger({
  //     before: 'Starting JS...',
  //     after: 'JS complete!',
  //     showChange: true
  // }))
  .pipe(rename('scripts.min.js'))
  .pipe(gulp.dest('./prod/js'))
  .pipe(hash())
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

gulp.task('vari', function(){
   gutil.log(gutil.env.path);
});

gulp.task('default', ['mincss', 'js', 'webserver', 'watch']);