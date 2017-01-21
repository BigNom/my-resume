var gulp     = require("gulp");
var mocha    = require("gulp-mocha");
var sequence = require("run-sequence");

var imageResize = require("../index.js");


gulp.task("mocha", ["image_resize"], function () {
  return gulp.src("test/*_test.js")
    .pipe(mocha({ reporter: "spec" }));
});



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
  width: 300
});


resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "upscale", {
  width: 600,
  height: 0,
  upscale: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "upscale2", {
  width: 600,
  height: 600,
  upscale: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "no_upscale", {
  width: 600,
  upscale: false
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "no_upscale2", {
  width: 100,
  height: 600,
  upscale: false
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

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "crop_gravity", {
  width: 400,
  height: 300,
  upscale: false,
  crop: true,
  gravity: "NorthWest"
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "crop_width_only", {
  width: 300,
  crop: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "quality", {
  width: 600,
  height: 0,
  upscale: false,
  quality: 0.2
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "sharpen", {
  width: 600,
  height: 0,
  sharpen: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "filter", {
  width: 600,
  height: 0,
  filter: "catrom"
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "samplingFactor", {
  width: 600,
  height: 0,
  samplingFactor: [2,2]
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "convert", {
  format: "jpg"
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "noProfile", {
  noProfile: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "flatten", {
  format: "jpg",
  flatten: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "interlace", {
  interlace: true
});

resize([
  "app/images/*.png",
  "app/images/*.jpg"
], "interlace_and_resize", {
  width: 400,
  interlace: true
});

gulp.task("image_resize", resizeTasks);

gulp.task("test", function(callback) {
  sequence("clean", "jshint", "mocha", callback);
});

gulp.task("default", ["test"]);
