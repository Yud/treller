const gulp = require('gulp');

const fs = require('fs');

const mocha = require('gulp-mocha');

const rootPath = process.cwd();

const testFolderPath = `${rootPath}/test/`;

gulp.task('watch', () => {
  const updatedFilePathRegExp = new RegExp(`^${rootPath}/app/(.+.js$)`);

  const watcher = gulp.watch('./app/api/v1/**/*.js');

  watcher.on('change', (event) => {
    const relativePath = event.path.match(updatedFilePathRegExp)[1];

    const testFilePath = testFolderPath + relativePath;

    if (relativePath && fs.existsSync(testFilePath)) {
      gulp.src(testFilePath, { read: false })
        .pipe(mocha({ reporter: 'dot' }));
    }
  });
});
