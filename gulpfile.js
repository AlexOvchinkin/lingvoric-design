const config      = require('./config');
const gulp        = require('gulp');
const sass        = require('gulp-sass');
const prefixer    = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const pug         = require('gulp-pug');

const reload = browserSync.reload;

 /*
 / pug task
*/
gulp.task('pug', function () {
  return gulp.src(config.src.pug)
    .pipe(pug( { pretty: true } ))
    .pipe(gulp.dest(config.build))
    .pipe(reload({ stream: true }));
});


 /*
 / Styles task
*/
gulp.task('styles', function () {
  gulp.src(config.src.stylesFile)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build))
    .pipe(reload({ stream: true }));
});

/*
 / Watcher
*/
gulp.task('watch', function () {
  gulp.watch(config.src.pug, ['pug']);
  gulp.watch(config.src.styles, ['styles']);
});

/*
 / browserSync task
*/
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    open: true,
    notify: false
  });
});


/*
 / DEFAULT task
*/
gulp.task('default', ['pug', 'styles', 'watch', 'browserSync']);