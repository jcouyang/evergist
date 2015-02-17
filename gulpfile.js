var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var downloadatomshell = require('gulp-download-atom-shell');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
  source: './components/evergist.jsx',
  less: ['less/*.less'],
	jsx: ['components/*.jsx', "stores/*"],
  javascripts: 'javascripts',
  stylesheets: 'stylesheets',
	tests: ['__tests__/**/*.jsx']
};

gulp.task('browserify', function() {
  var bundle = browserify({
    entries: paths.source,
    debug: true,
    extensions: ['.jsx','.js']
  })
        .transform(babelify)
        .transform(['envify'])
        .bundle()
        .pipe(source('evergist.js'))
        .pipe(buffer());
  if(process.env.NODE_ENV==='production'){
    bundle = bundle.pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }
  return bundle.pipe(gulp.dest(paths.javascripts));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsx, ['browserify']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.stylesheets));
});

gulp.task('build', ['browserify','less']);

gulp.task('atomshell', function(cb){
    downloadatomshell({
      version: '0.20.5',
      outputDir: 'bin'
    }, cb);
});
