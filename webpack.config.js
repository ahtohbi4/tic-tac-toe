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

let config = {};

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
            loader: extractCSS.extract('css!postcss'),
        },
        {
            test: /\.html$/,
            loader: extractHTML.extract('raw!html-minify'),
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file?name=[hash].[ext]',
        },
        {
            test: /\.(js|jsx)$/,
            loaders: (() => {
                let result = [];

                if (isDev) {
                    result.push('react-hot');
                }
                result.push('babel');

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
            new webpack.NoErrorsPlugin(),
        ]);
    } else {
        result = [].concat(result, [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                acorn: true,
            })
        ]);
    }

    return result;
})();

// PostCSS
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const atImport = require('postcss-import');
const url = require('postcss-url');

config.postcss = (() => {
    let result = [
        atImport({
            path: [
                path.join(__dirname, 'app/resources/blocks/'),
                path.join(__dirname, 'app/resources/pages/'),
            ],
        }),
        url({
            basePath: path.join(__dirname, 'app/resources/'),
            url: 'inline',
        }),
        autoprefixer({
            browsers: [
                'last 2 versions',
            ],
        }),
    ];

    if (isDev) {
        result.push(csso({
            debug: 3,
            restructure: true,
        }));
    }

    return result;
})();

// Resolve
config.resolve = {
    extensions: [
        '',
        '.js',
        '.jsx',
    ]
};

// Dev Server
config.devServer = {
    host: HOST,
    port: PORT,
};

module.exports = config;
