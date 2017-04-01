'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV !== 'production';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractHTML = new ExtractTextPlugin('index.html');
const extractCSS = new ExtractTextPlugin('[name].css');

const HOST = 'localhost';
const PORT = 8080;

const config = {};

// Dev Tool
config.devtool = isDev ? 'eval' : false;

// Watch
config.watch = isDev;

// Entry
config.entry = (() => {
    let result = [];

    if (isDev) {
        result = [].concat(result, [
            `webpack-dev-server/client?http://${HOST}:${PORT}`,
            'webpack/hot/only-dev-server',
        ]);
    }
    result.push('./app/resources/pages/index');

    return result;
})();

// Output
config.output = {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
};

// Module
config.module = {
    loaders: [
        {
            test: /\.css$/,
            loader: extractCSS.extract('css-loader!postcss-loader'),
        },
        {
            test: /\.html$/,
            loader: extractHTML.extract('raw-loader!html-minify-loader'),
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file?name=[hash].[ext]',
        },
        {
            test: /\.(js|jsx)$/,
            loaders: (() => {
                const result = [];

                if (isDev) {
                    result.push('react-hot-loader');
                }
                result.push('babel-loader');

                return result;
            })(),
            include: [
                path.join(__dirname, 'app/'),
                path.join(__dirname, 'node_modules/matrix-slicer/'),
            ],
        },
    ],
};

// Plugin
config.plugins = (() => {
    let result = [
        new webpack.DefinePlugin({
            __DEV__: isDev,
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        extractHTML,
        extractCSS,
    ];

    if (isDev) {
        result = [].concat(result, [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ]);
    } else {
        result = [].concat(result, [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                acorn: true,
            }),
        ]);
    }

    return result;
})();

// Resolve
config.resolve = {
    extensions: [
        '.js',
        '.jsx',
    ],
};

// Dev Server
config.devServer = {
    host: HOST,
    port: PORT,
};

module.exports = config;
