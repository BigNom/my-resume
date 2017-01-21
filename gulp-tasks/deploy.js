var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var options = {
  branch: 'gh-pages'
};

gulp.task('deploy', ['default'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages(options));
});
