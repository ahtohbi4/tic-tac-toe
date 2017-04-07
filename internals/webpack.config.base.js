'use strict';

const path = require('path');
const webpack = require('webpack');

const {
    HOST,
    PORT,
} = require('./config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractHTML = new ExtractTextPlugin('index.html');
const extractCSS = new ExtractTextPlugin('[name].css');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV !== 'production';
const baseDir = process.cwd();

module.exports = (options) => ({
    entry: Array.prototype.concat([
        './app/resources/pages/index',
    ], options.entry || []),

    output: {
        filename: '[name].js',
        path: path.join(baseDir, 'build'),
        publicPath: '/build/',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract([
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: options.postcssOptions,
                    },
                ]),
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
                test: /\.js$/,
                use: Array.prototype.concat(options.jsLoaders || [], [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'es2015',
                                'stage-0',
                                'react',
                            ],
                        },
                    },
                ]),
                include: [
                    path.join(baseDir, 'app/'),
                    path.join(baseDir, 'node_modules/matrix-slicer/'),
                ],
            },
        ],
    },

    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            __DEV__: isDev,
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        extractHTML,
        extractCSS,
    ]),

    resolve: {
        extensions: [
            '.js',
        ],
    },

    devServer: {
        host: HOST,
        port: PORT,
    },
});
