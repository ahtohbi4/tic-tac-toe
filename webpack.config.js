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

let entry = [
    './app/resources/pages/index'
];
let plugins = [
    devFlagPlugin,
    extractHTML,
    extractCSS
];
let loaders = [
    {
        test: /\.css$/,
        loader: extractCSS.extract('css!postcss')
    },
    {
        test: /\.html$/,
        loader: extractHTML.extract('raw!html-minify')
    },
    {
        test: /\.(jpg|png|svg)$/,
        loader: 'file?name=[hash].[ext]'
    }
];

if (__DEV__) {
    entry.push(`webpack-dev-server/client?http://${HOST}:${PORT}`);
    entry.push('webpack/hot/only-dev-server');

    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());

    loaders.push({
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app/resources/')
    });
} else {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        acorn: true
    }));

    loaders.push({
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app/resources/')
    });
}

module.exports = {
    devtool: __DEV__ ? 'eval' : false,

    watch: __DEV__,

    entry: entry,

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/build/'
    },

    plugins: plugins,

    module: {
        loaders: loaders
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
