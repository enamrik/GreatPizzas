var gulp = require('gulp');
var jest = require('jest-cli');
var os = require('os');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var change = require('gulp-change');

gulp.task('default', ['test']);

argv["api-domain"] = argv["api-domain"] || 'http://localhost:4567';

gulp.task('prepare-settings', function() {
  return gulp.src('app/settings.js')
    .pipe(change(function(content){
      var settings = parseSettings(content);
      settings["api-domain"] = argv["api-domain"];
      return stringifySettings(settings);
    }))
    .pipe(gulp.dest('app'))
});

gulp.task('test', function(done) {
  jest.runCLI({ config : jestConfig }, ".", function() {
    done();
  });
});

gulp.task('tdd', function() {
  gulp.watch([ jestConfig.rootDir + "/**/*.js" ], [ 'test' ]);
});

//If any changes are made to the babelrc file, stop the packager, run this command and restart the packager
//See: https://github.com/mjohnston/react-native-webpack-server/issues/63
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

function parseSettings(settingsString) {
  var settings = settingsString.substring(settingsString.indexOf('=') + 1);
  return JSON.parse(settings.substring(0, settings.lastIndexOf(';')));
}

function stringifySettings(settings){
  return "module.exports=" + JSON.stringify(settings, null, ' ') + ";";
}

var jestConfig = {
  rootDir: 'app'
};
