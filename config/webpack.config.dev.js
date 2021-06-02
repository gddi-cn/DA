// const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    // 生产环境配置，开发不需要
    // path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
  },
};
