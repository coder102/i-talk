const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssnano = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      runSequence = require('run-sequence');

// Development Tasks
// -----------------

gulp.task('browserSync', () => {
  browserSync({
    server: true
  });
});

gulp.task('sass', () => {
  // return gulp.src('src/scss/**/*.scss')
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano([ autoprefixer() ]))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  // gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', ['js']);// browserSync.reload);
});

// Optimization Tasks
// ------------------

gulp.task('js', () => {
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest('public'));
});

// Optimizing Images
gulp.task('images', () => {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('public/img'));
});

// Copying fonts
gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('public/fonts'));
});

// Cleaning
gulp.task('clean', () => {
  return del.sync('public').then((cb) => {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:public', () => {
  return del.sync(['public/**/*', '!public/images', '!public/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', (callback) => {
  runSequence(['sass', 'js', 'browserSync'], 'watch',
    callback
  );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:public',
    'sass',
    ['js', 'images', 'fonts'],
    callback
  );
});
