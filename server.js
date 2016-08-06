'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

const HOST = config.devServer.host;
const PORT = config.devServer.port;

new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}).listen(PORT, HOST, (err, result) => {
    if (err) {
        console.log(err);
    }

    console.log(`Listening at ${HOST}:${PORT}.`);
});
