var gulp = require('gulp');
var sass = require('gulp-sass');
var ugly = require('gulp-uglify');
var hash = require('gulp-hash');
var inject = require('gulp-inject');

gulp.task('js', async function () {
  gulp.src('assets/js/**/*.js')
    .on('error', function (error) { console.log(error) })
    .pipe(ugly())
    .on('error', function (error) { console.log(error) })
    .pipe(gulp.dest('static/js'))
    .on('error', function (error) { console.log(error) });
});

gulp.task('inject-js', function() {
  var opts = {
    algorithm: 'sha1',
    hashLength: 40,
    template: '<%= name %><%= ext %>?hash=<%= hash %>'
  };

  return gulp.src('html/**/*.html')
    .pipe(inject(gulp.src('static/js/*.js').pipe(hash(opts))))
    .pipe(gulp.dest('templates'));
})

gulp.task('sass', function () {
  gulp.src('assets/sass/**/*.scss')
    .on('error', function (error) { console.log(error) })
    .pipe(sass())
    .on('error', function (error) { console.log(error) })
    .pipe(gulp.dest('static/css'))
    .on('error', function (error) { console.log(error) });
});

gulp.task('default', function () {
  gulp.watch('assets/js/*.js', gulp.series(['js', 'inject-js']));
  gulp.watch('assets/sass/*.scss', gulp.series(['sass']));
});