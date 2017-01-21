gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(80, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});

gulp.task('psi-seq', function (cb) {
  return sequence(
    'serve', // name of your server task here
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});


gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
})
