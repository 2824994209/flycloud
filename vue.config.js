const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ]
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://ouvudspruesl.sealoshzh.site',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '/api' },
  //       onProxyReq: (proxyReq, req, res) => {
  //         console.log('Proxying request:', req.url);
  //       },
  //       onProxyRes: (proxyRes, req, res) => {
  //         console.log('Received response from target:', proxyRes.statusCode);
  //       }
  //     },
  //   }
  // }
});