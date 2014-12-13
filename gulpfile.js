var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var downloadatomshell = require('gulp-download-atom-shell');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
  source: ['./components/evergist.jsx'],
  less: ['less/*.less'],
	jsx: ['components/**/*.jsx', 'components/*.jsx'],
  javascripts: 'javascripts',
  stylesheets: 'stylesheets',
	tests: ['__tests__/**/*.jsx']
};

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: paths.source[0],
    debug: true,
    extensions: '.jsx'
  });
  bundler.transform(['reactify',{'es6':true}]);
  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source('evergist.js'))
      .pipe(buffer())
	    .pipe(gulp.dest(paths.javascripts))
      .pipe(livereload({auto: false}));
  };

  return bundle();
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('components/**', ['browserify']);
  gulp.watch('less/**', ['less']);
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.stylesheets));
});

gulp.task('build', ['browserify','less']);

gulp.task('atomshell', function(cb){
    downloadatomshell({
      version: '0.19.5',
      outputDir: 'bin'
    }, cb);
});
