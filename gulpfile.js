var gulp = require('gulp');

var SRC_CSS = 'app/Resources/**/*.css',
    SRC_JS = 'app/Resources/**/*.js',
    DEST = '',
    DEST_STATIC = 'compiled/';

// @see: https://github.com/contra/gulp-concat
var concat = require('gulp-concat');

gulp.task('compile-css', function () {
    gulp
        .src([
            'node_modules/normalize.css/normalize.css',
            SRC_CSS
        ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest(DEST_STATIC + 'css/'));
});

gulp.task('compile-js', function () {
    gulp
        .src([
            'vendors/underscore-min.js',
            'vendors/backbone-min.js',
            SRC_JS
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(DEST_STATIC + 'js/'));
});

gulp.task('compile', [
    'compile-css',
    'compile-js'
])

// @see: https://github.com/jobelobes/gulp-include-source
var includeSources = require('gulp-include-source');

gulp.task('html', function () {
    gulp
        .src('app/Resources/Views/index.html')
        .pipe(includeSources({
            cwd: '.'
        }))
        .pipe(gulp.dest(DEST));
});

gulp.task('build', [
    'compile',
    'html'
]);

gulp.task('default', [
    'build'
]);

gulp.task('watch', function () {
    gulp.watch([
        SRC_CSS,
        SRC_JS
    ], [
        'build'
    ]);
});
