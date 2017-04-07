'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV !== 'production';

const { HOST, PORT } = require('./config');
const webpackConfig = isDev ? require('./webpack.config.dev') : require('./webpack.config.prod');

new WebpackDevServer(webpack(webpackConfig), {
    host: HOST,
    port: PORT,

    historyApiFallback: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
    },
}).listen(PORT, HOST, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Listening at ${HOST}:${PORT}.`);
});
