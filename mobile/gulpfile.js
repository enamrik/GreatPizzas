var gulp = require('gulp');
var jest = require('jest-cli');
var os = require('os');
var fs = require('fs');
var path = require('path');

var jestConfig = {
  rootDir: 'app'
};

gulp.task('test', function(done) {
  jest.runCLI({ config : jestConfig }, ".", function() {
    done();
  });
});

gulp.task('tdd', function() {
  gulp.watch([ jestConfig.rootDir + "/**/*.js" ], [ 'test' ]);
});

gulp.task('clear-packager-cache', function () {
  var tempDir = os.tmpdir();

  var cacheFiles = fs.readdirSync(tempDir).filter(function (fileName) {
    return fileName.indexOf('react-packager-cache') === 0;
  });

  cacheFiles.forEach(function (cacheFile) {
    var cacheFilePath = path.join(tempDir, cacheFile);
    fs.unlinkSync(cacheFilePath);
    console.log('Deleted cache: ', cacheFilePath);
  });

  if (!cacheFiles.length) {
    console.log('No cache files found!');
  }
});

gulp.task('default', ['test']);