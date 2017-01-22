var gulp     = require("gulp");
var mocha    = require("gulp-mocha");
var sequence = require("run-sequence");
var imageResize = require("../index.js");


gulp.task("mocha", ["image_resize"], function () {
  return gulp.src("test/*_test.js")
    .pipe(mocha({ reporter: "spec" }));
});

// Run gulp image_resize

var resizeTasks = [];

var resize = function(files, key, options) {

  function makeTask(files, key, options) {
    gulp.task("image_resize:" + key, function () {
      return gulp.src(files)
        .pipe(imageResize(options))
        .pipe(gulp.dest("tmp/" + key));
    });
    resizeTasks.push("image_resize:" + key);
  }

  makeTask(files, key, options);

  var imOptions = { imageMagick : true };
  for (var k in options) { imOptions[k] = options[k]; }
  makeTask(files, key + "_imagemagick", imOptions);
};


resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "resize", {
  width: 100
});


resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "crop", {
  width: 400,
  height: 300,
  upscale: false,
  crop: true
});







gulp.task("image_resize", resizeTasks);

gulp.task("test", function(callback) {
  sequence("clean", "jshint", "mocha", callback);
});

gulp.task("default", ["test"]);
