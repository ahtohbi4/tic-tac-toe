'use strict';

const ENV = process.env.ENV || 'development';
const isDev = ENV === 'development';

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

const named = require('vinyl-named');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

const PATHS = {
    src: {
        html: 'app/*.html',
        css: [
            'lib/normalize.css/*.css',
            'app/*.css'
        ],
        js: 'app/*.jsx'
    },
    dest: {
        html: './',
        css: 'compiled/css',
        js: 'compiled/js'
    }
};

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(rename('index.html'))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(PATHS.dest.html));
});

gulp.task('webpack', function () {
    let config = {
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                }
            ]
        },
        watch: isDev ? true : false,
        externals: {
            'react': 'React'
        },
        resolve: {
            extensions: [
                '',
                '.js',
                '.jsx'
            ]
        }
    };

    return gulp.src(PATHS.src.js)
        .pipe(named())
        .pipe(webpackStream(config))
        .pipe(gulp.dest(PATHS.dest.js));
});

gulp.task('css', function () {
    return gulp.src(PATHS.src.css)
        .pipe(named())
        .pipe(gulp.dest(PATHS.dest.css));
});

gulp.task('default', [
    'html',
    'css',
    'webpack'
]);

// Watchers
gulp.task('watch:html', [
    'html'
], function () {
    return gulp.watch(PATHS.src.html, [
        'html'
    ]);
});

gulp.task('watch:css', [
    'css'
], function () {
    return gulp.watch(PATHS.src.css, [
        'css'
    ]);
});

gulp.task('watch:js', [
    'webpack'
], function () {
    return gulp.watch(PATHS.src.js, [
        'webpack'
    ]);
});

gulp.task('watch', [
    'watch:html',
    'watch:js',
    'watch:css'
]);
