// https://webpack.docschina.org/configuration/dev-server/#devserverproxy
module.exports = {

  proxy: [

    {
      context: ['/api/process/socket.io'],

      target: 'ws://xxxx.lab.k8s.xxx.com',
      changeOrigin: true,

      logLevel: 'debug',
      ws: true,
    },

    {
      context: ['/api'],
      target: 'http://xxx.lab.k8s.xxx.com',
      changeOrigin: true,
      // xfwd: false,
      secure: false,
    },
  ]

}
