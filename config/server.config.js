// https://webpack.docschina.org/configuration/dev-server/#devserverproxy
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
