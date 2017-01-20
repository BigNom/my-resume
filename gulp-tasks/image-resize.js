var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

gulp.task('image-resize', ['clean'], function () {
  gulp.src(['app/images/**/*.jpg', 'app/images/**/*.png'])
    .pipe(imageResize({
      height : 500,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/images/'));
});
