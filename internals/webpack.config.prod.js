'use strict';

const autoprefixer = require('autoprefixer');
const postcssCsso = require('postcss-csso');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const webpack = require('webpack');

const {
    AUTOPREFIXER,
    CSSO,
    POSTCSS_IMPORT,
    POSTCSS_URL,
} = require('./config');

module.exports = require('./webpack.config.base')({
    // PostCSS plugins
    postcssOptions: {
        plugins: [
            postcssImport(POSTCSS_IMPORT),
            postcssUrl(POSTCSS_URL),
            autoprefixer(AUTOPREFIXER),
            postcssCsso(CSSO),
        ],
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            acorn: true,
        }),
    ],
});
