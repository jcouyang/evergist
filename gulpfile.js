var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var downloadatomshell = require('gulp-download-atom-shell');
var rename = require('gulp-rename');
var less = require('gulp-less');
var paths = {
  source: ['components/evergist.jsx'],
  less: ['less/*.less'],
	jsx: ['components/**/*.jsx', 'components/*.jsx'],
  javascripts: 'javascripts',
  stylesheets: 'stylesheets',
	tests: ['__tests__/**/*.jsx']
};

gulp.task('browserify', function() {
  return gulp.src(paths.source)
		.pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx']
    }))
    .pipe(rename('evergist.js'))
	  .pipe(gulp.dest(paths.javascripts));
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
