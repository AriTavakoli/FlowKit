
var webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin');


module.exports = {

  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks : 'initial',
        minChunks: 2,
        // priority: -10,
        // reuseExistingChunk: true,
        // enforce: true,

      },
    },
  },




}