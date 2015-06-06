// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var ts = require('gulp-typescript');

//https://www.npmjs.com/package/gulp-typescript
gulp.task('typescript', function() {
  console.log('Compiling typescript');
  return gulp.src(['src/**/*.ts'],
          {base: './'})
          .pipe(ts({module: 'commonjs', target: 'ES5'}))
          .js.pipe(gulp.dest('.'))
});

//  Watch and Livereload using Libsass
//===========================================
gulp.task('watch', function() {
    // watch task for gulp-includes
    gulp.watch('src/**/*.ts', 
      ['typescript']);
});

// Default Task
gulp.task('default', ['typescript', 'watch']);