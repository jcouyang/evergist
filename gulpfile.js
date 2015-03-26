var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var downloadatomshell = require('gulp-download-atom-shell');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var connect = require('gulp-connect');
var port = process.env.PORT || 8080;
var reloadPort = process.env.RELOAD_PORT || 35729;

var paths = {
  source: './lib/app.jsx',
  less: ['less/*.less'],
	javascripts: 'javascripts',
  stylesheets: 'stylesheets',
	tests: ['__tests__/**/*.jsx']
};

gulp.task('clean', function () {
  del(['javascripts']);
});

gulp.task('build', function() {
  var bundle = browserify({
    entries: paths.source,
    debug: true,
    extensions: ['.jsx','.js']
  })
        .transform(babelify)
        .transform(['envify'])
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer());
  if(process.env.NODE_ENV==='production'){
    bundle = bundle.pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }
  return bundle.pipe(gulp.dest(paths.javascripts));
});

gulp.task('serve', ['build'], function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src(paths.source)
    .pipe(connect.reload());
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.stylesheets));
});

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*.jsx'], ['build', 'reload-js']);
  gulp.watch([paths.less], ['less', 'reload-js']);
});

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('atomshell', function(cb){
    downloadatomshell({
      version: '0.20.5',
      outputDir: 'bin'
    }, cb);
});
