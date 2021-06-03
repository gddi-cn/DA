'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const paths = require('../config/config-utils/path')
const webpackDevConfig = require('../config/webpack.config.dev');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
// const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
// const chalk = require('chalk');
const {
  choosePort,
} = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';

choosePort(HOST, DEFAULT_PORT).then(port => {
  const options = {
    historyApiFallback: true,
    contentBase: paths.appPublic,
    compress: true,
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    inline: true,
    stats: {
      colors: true,
      cached: true
    },
    host: HOST,
    port: port,
    open: true,
    transportMode: 'ws',
    overlay: false,
    // writeToDisk: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },

  };

  WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);

  const compiler = webpack(webpackDevConfig);

  const server = new WebpackDevServer(compiler, options);

  server.listen(port, 'localhost', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Starting server on ' + 'localhost:3000');
  })
});
