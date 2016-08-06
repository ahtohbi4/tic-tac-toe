'use strict'

const path = require('path');
const webpack = require('webpack');

const __DEV__ = (process.env.ENV === 'dev');
const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: __DEV__
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractHTML = new ExtractTextPlugin('index.html');
let extractCSS = new ExtractTextPlugin('[name].css');

const autoprefixer = require('autoprefixer');

const HOST = 'localhost';
const PORT = 8080;

module.exports = {
    devtool: 'eval',

    watch: __DEV__,

    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        'webpack/hot/only-dev-server',
        './app/resources/pages/index'
    ],

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/build/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        devFlagPlugin,
        extractHTML,
        extractCSS
    ],

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: extractCSS.extract('css!postcss')
            },
            {
                test: /\.html$/,
                loader: extractHTML.extract('raw!html-minify')
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'app/resources/')
            }
        ]
    },

    postcss: () => {
        return [
            autoprefixer
        ];
    },

    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ]
    },

    devServer: {
        host: HOST,
        port: PORT
    }
};
