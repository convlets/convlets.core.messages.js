// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");

var fs = require('fs');
var ts = require('gulp-typescript');

var del = require('del');

var runSequence = require('run-sequence');

var paths = {
    templates: 'templates'
};

var BUILD_DIR = 'output';

//https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
gulp.task('clean', function (cb) {
  del([
    'output/**/*',
    // we don't want to clean this folder though so we negate the pattern
    '!output/fonts', '!output/fonts/**/*'
  ], cb);
});

gulp.task('build',
    function () {
       runSequence('clean', 'css', 
                  'typescript', 'js', 'html', function() {

          });      
});

//http://stackoverflow.com/questions/22824546/how-to-run-gulp-tasks-synchronously-one-after-the-other
//REVISIT this.
gulp.task('build-dependencies',
    function () {
        return gulp.src('dependencies/**/*')
            .pipe(cachebust.resources())
            .pipe(gulp.dest('output'));     
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();

  var fs = require('fs');
  var output_dir = __dirname + '/output';

  //http://stackoverflow.com/questions/16895047/any-way-to-serve-static-html-files-from-express-without-the-extension
  app.use(function(req, res, next) {
    if (req.path.indexOf('.') === -1) {
      var file = output_dir + req.path + '.html';
      fs.exists(file, function(exists) {
        if (exists)
          req.url += '.html';
        next();
      });
    }
    else
      next();
  });
  app.use(express.static(output_dir));

  app.listen(4000);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('typescript', function() {
  console.log('Compiling typescript');
  return gulp.src(['js/app/**/*.ts'],
          {base: './'})
          .pipe(ts({module: 'commonjs'}))
          //.js.pipe(gulp.dest('./deploy/server'))
          .js.pipe(gulp.dest('.'))
});

gulp.task('html', ['build-dependencies'], function () {
  nunjucksRender.nunjucks.configure('templates');

  return gulp.src(['templates/**/*.html', '!templates/layout.html'])
    .pipe(nunjucksRender()) 
    .pipe(cachebust.references()) 
    .pipe(gulp.dest('./output')) 
    .pipe(inlinesource())     
    .pipe(gulp.dest('./output'))    
   // .pipe(livereload(server))
    .pipe(notify({ message: 'Finished rendering templates ...' }));
});

gulp.task('js', ['core_js', 'login_js', 'register_js']);
gulp.task('core_js', function() {
    return gulp.src(['jspm_packages/github/components/jquery@2.1.3/jquery.min.js',
                'jspm_packages/github/twbs/bootstrap@3.3.4/js/bootstrap.min.js',
                'jspm_packages/github/knockout/knockout@3.3.0/dist/knockout.js',
                'jspm_packages/github/SteveSanderson/knockout-es5@0.1.1/dist/knockout-es5.min.js'],
            {base: './'})
        .pipe(concat('core.js'))
       // .pipe(gulp.dest('output'))
        .pipe(rename('core.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dependencies'));
});

gulp.task('login_js', function() {
    return gulp.src(['js/app/**/*.js',
                'js/plugins/**/*.js'],
            {base: './'})
        .pipe(concat('login.js'))
       // .pipe(gulp.dest('output'))
        .pipe(rename('login.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dependencies'));
});

gulp.task('register_js', function() {
    return gulp.src(['js/app/**/*.js',
                'js/plugins/**/*.js'],
            {base: './'})
        .pipe(concat('register.js'))
       // .pipe(gulp.dest('output'))
        .pipe(rename('register.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dependencies'));
});

gulp.task('css', ['core_css', 'login_css', 'register_css']);
gulp.task('core_css', function() {
    var opts = {
      keepSpecialComments : 0,
    }; 

    return gulp.src(['jspm_packages/github/twbs/bootstrap@3.3.4/css/bootstrap.min.css',
                'jspm_packages/npm/font-awesome@4.3.0/css/font-awesome.min.css',
                'css/style.css',
                'css/app.css'],
            {base: './'})
        .pipe(concat('core.css'))
        .pipe(rename('core.min.css'))
        .pipe(minifycss(opts))
        .pipe(gulp.dest('dependencies'));
});

gulp.task('login_css', function() {
    var opts = {
      keepSpecialComments : 0,
    }; 

    return gulp.src(['css/**/*.css'],
            {base: './'})
        .pipe(concat('login.css'))
      //  .pipe(gulp.dest('output'))
        .pipe(rename('login.min.css'))
        .pipe(minifycss(opts))
       // .pipe(gulp.dest('dependencies'));
});

gulp.task('register_css', function() {
    var opts = {
      keepSpecialComments : 0,
    }; 

    return gulp.src(['css/**/*.css'],
            {base: './'})
        .pipe(concat('register.css'))
      //  .pipe(gulp.dest('output'))
        .pipe(rename('register.min.css'))
        .pipe(minifycss(opts))
    //    .pipe(gulp.dest('dependencies'));
});


//  Watch and Livereload using Libsass
//===========================================
gulp.task('watch', function() {
    // watch task for gulp-includes
    gulp.watch( 
      path.join(paths.templates, '**/*.html'), 
      ['html']);

    gulp.watch( 
      path.join(paths.templates, '**/*.css'), 
      ['html']);

    gulp.watch( 
      path.join(paths.templates, '**/*.js'), 
      ['html']);
});

// Default Task
gulp.task('default', ['express', 'build', 'watch']);