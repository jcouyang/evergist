var gulp = require('gulp');
var browserify = require('browserify');
var downloadatomshell = require('gulp-download-atom-shell');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  source: './components/evergist.jsx',
  less: ['less/*.less'],
	jsx: ['components/*.jsx', "stores/*"],
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
  var bundle = browserify({
    entries: paths.source,
    debug: true,
    extensions: ['.jsx','.js']
  })
        .transform(['reactify',{es6:true}])
        .transform(['envify'])
        .bundle()
        .pipe(source('evergist.js'))
        .pipe(buffer());
  if(process.env.NODE_ENV==='production'){
    return bundle.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(paths.javascripts));
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
