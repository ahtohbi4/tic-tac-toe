'use strict';

const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const webpack = require('webpack');

const {
    HOST,
    PORT,

    AUTOPREFIXER,
    POSTCSS_IMPORT,
    POSTCSS_URL,
} = require('./config');

module.exports = require('./webpack.config.base')({
    devtool: 'eval',

    watch: true,

    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        'webpack/hot/only-dev-server',
    ],

    // PostCSS plugins
    postcssOptions: {
        plugins: [
            postcssImport(POSTCSS_IMPORT),
            postcssUrl(POSTCSS_URL),
            autoprefixer(AUTOPREFIXER),
        ],
    },

    jsLoaders: [
        'react-hot-loader',
    ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
});
