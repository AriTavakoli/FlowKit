var webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin');


module.exports = {

  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: true,
      parallel: true,
      terserOptions: {
        compress: {
          unused: true,
          drop_console: true,
          reduce_funcs: true,
          hoist_funs: true,
          pure_getters: true,
        },
        mangle: true,
        output: {
          comments: false,
          beautify: false,
          semicolons: false,
        },

      },

    }),
  ],



}