const path = require('path');
const webpack = require('webpack');
const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

const autoprefixer = require('autoprefixer');

const HOST = 'localhost';
const PORT = 8080;

module.exports = {
    devtool: 'eval',

    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        'webpack/hot/only-dev-server',
        './app/resources/pages/index'
    ],

    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'build'),
        publicPath: '/build/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        devFlagPlugin
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'app/resources/')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
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
