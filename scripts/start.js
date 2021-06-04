'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const paths = require('../config/config-utils/path')
const webpackDevConfig = require('../config/webpack.config.dev');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
// const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const chalk = require('chalk');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

choosePort(HOST, DEFAULT_PORT).then(port => {
  const options = {
    https: process.env.HTTPS,
    historyApiFallback: true,
    contentBase: paths.appPublic,
    compress: true,
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    inline: true,
    stats: {
      colors: true,
      cached: true,
      builtAt: true,
      timings: true,
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

  // function clearConsole () {
  //   process.stdout.write(
  //     process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  //   );
  // }

  function printInstructions (appName, urls, useYarn) {
    // clearConsole()
    console.log('------------------------------------------------------------');
    console.log(`你现在可以在浏览器中查看 ${chalk.blueBright(appName)} 项目.`);
    console.log('------------------------------------------------------------');

    if (urls.lanUrlForTerminal) {
      console.log('------------------------------------------------------------');
      console.log(
        `  ${chalk.bold('本地:')}            ${urls.localUrlForTerminal}`
      );
      console.log(
        `  ${chalk.bold('网络:')}  ${urls.lanUrlForTerminal}`
      );
      console.log('------------------------------------------------------------');
    } else {
      console.log('------------------------------------------------------------');
      console.log(chalk.bold(`  ${urls.localUrlForTerminal}`));
      console.log('------------------------------------------------------------');
    }
  }

  const urls = prepareUrls(
    protocol,
    HOST,
    port,
    paths.publicUrlOrPath.slice(0, -1)
  );

  compiler.hooks.done.tap('done', stats => {
    printInstructions('REACT-CLI', urls)
  })

  const server = new WebpackDevServer(compiler, options);

  server.listen(port, 'localhost', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Starting server on ' + 'localhost:3000');
  })
});
