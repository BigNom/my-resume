var gulp = require('gulp');
var responsive = require('gulp-responsive-images');

gulp.task('responsive-images', function () {
  gulp.src('app/images/**/*')
    .pipe(responsive({
      'hero.png': [{
        width: 100,
        suffix: '-100'
      }, {
        width: 100 * 2,
        suffix: '-100-2x'
      }],
      '*.png': [{
        width: 600,
        crop: true
      }]
    }))
    .pipe(gulp.dest('dist/images'));
});
