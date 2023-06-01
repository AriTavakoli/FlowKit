const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // ...other configuration options...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true,
            sequences: true,
            booleans: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};