'use strict';

/**
 * @type {string} ENV - Mode of deployment. Available 'dev' and 'prod' values.
 * @example '$ ENV=prod gulp'
 */
const ENV = process.env.ENV || 'dev';
const isDev = ENV === 'dev';

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

const named = require('vinyl-named');
const htmlmin = require('gulp-htmlmin');

const PATHS = {
    src: {
        html: 'app/resources/pages/index.html',
        css: 'app/resources/pages/index.css'
    },
    dest: 'build/'
};

gulp.task('html', () => {
    return gulp.src(PATHS.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('webpack', () => {
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
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('css', () => {
    const postcss = require('gulp-postcss');
    const sourcemaps = require('gulp-sourcemaps');

    const plugins = [
        require('postcss-import'),
        require('autoprefixer'),
        (!isDev ? require('postcss-csso') : null)
    ].filter((plugin) => {
        return plugin;
    });

    return gulp.src(PATHS.src.css)
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('default', [
    'html',
    'css',
    'webpack'
]);

// Watchers
gulp.task('watch:html', [
    'html'
], () => {
    return gulp.watch(PATHS.src.html, [
        'html'
    ]);
});

gulp.task('watch:css', [
    'css'
], () => {
    return gulp.watch(PATHS.src.css, [
        'css'
    ]);
});

gulp.task('watch:js', [
    'webpack'
], () => {
    return gulp.watch(PATHS.src.js, [
        'webpack'
    ]);
});

gulp.task('watch', [
    'watch:html',
    'watch:js',
    'watch:css'
]);
