'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const paths = require('../config/config-utils/path')
const webpackDevConfig = require('../config/webpack.config.dev');
const host = process.env.HOST || '127.0.0.1';
const options = {
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebook/create-react-app/issues/387.
    disableDotRule: true,
    index: paths.publicUrlOrPath,
  },
  compress: true,
  hot: true,
  publicPath: '/',
  inline: true,
  stats: {
    colors: true,
    cached: true
  },
  host,
  port: 3000,
  quiet: true,
  transportMode: 'ws',
};
console.log(webpackDevConfig)
const compiler = webpack(webpackDevConfig);

const server = new WebpackDevServer(compiler, options);
console.log('server')
server.listen(3000, 'localhost', function () {
  console.log('Starting server on ' + 'localhost:3000');
});
