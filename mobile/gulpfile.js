var gulp = require('gulp');
var jest = require('jest-cli');

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

gulp.task('default', ['test']);