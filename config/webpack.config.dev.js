const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
// const fs = require('fs')
process.env.NODE_ENV = process.env.ENV = 'development';

const baseConfigFn = require('./webpack.config.base');

const baseConfig = baseConfigFn('development')

const devConfig = {
  devtool: 'cheap-module-source-map',
  output: {
    // bundle
    filename: 'static/js/bundle.js',
    // 块
    chunkFilename: 'static/js/[name].chunk.js',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
const mergeDevConfig = merge(baseConfig, devConfig);

// 如果你怀疑自己的配置有问题，可以搞出来看看
// fs.writeFile('message.js', JSON.stringify(mergeDevConfig), { }, (err) => {
//   console.log(err)
// });
module.exports = mergeDevConfig
