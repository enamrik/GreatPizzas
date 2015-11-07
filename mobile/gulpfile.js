var gulp = require('gulp');
var os = require('os');
var fs = require('fs');
var path = require('path');
var change = require('gulp-change');
require('gulp-command')(gulp);

gulp.task('default', ['test']);

gulp
  .option('prepare-settings', '-a, --api', 'Specify backend api domain')
  .task('prepare-settings', function() {
  var api_domain = this.flags.api || 'http://localhost:4567';

  return gulp.src('app/settings.js')
    .pipe(change(function(content){
      var settings = parseSettings(content);
      settings["api-domain"] = api_domain;
      return stringifySettings(settings);
    }))
    .pipe(gulp.dest('app'))
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
