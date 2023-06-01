var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  consoleUtil = require('../utils/consoleUtil'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config()
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");


const isBundleAnalyzerEnabled = process.env.BUNDLE_ANALYZER === 'true';


module.exports = [
  new CleanWebpackPlugin({ verbose: false }),
  new webpack.ProgressPlugin(),

  new CssMinimizerPlugin(),
  new MiniCssExtractPlugin(),

  new webpack.ProvidePlugin({
    React: 'react',
  }),


  // expose and write the allowed env vars on the compiled bun1dle
  new webpack.EnvironmentPlugin(['NODE_ENV']),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../dist/workerBundle.js'),
        to: path.resolve(__dirname, '../../build/'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/manifest.json'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true,
        transform: function (content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            })
          );
        },
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/assets/img/icon-128.png'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/assets/img/icon-34.png'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/assets/img/icon-16.png'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        noErrorOnMissing: true
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/assets/img/icon-129.png'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),
  // new HtmlWebpackPlugin({
  //   template: path.join(__dirname, '../src', 'pages', 'Newtab', 'index.html'),
  //   filename: 'newtab.html',
  //   chunks: ['newtab'],
  //   cache: false,
  // }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../../src', 'pages', 'Options', 'index.html'),
    filename: 'options.html',
    chunks: ['options'],
    cache: false,
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../../src', 'pages', 'Popup', 'index.html'),
    filename: 'popup.html',
    chunks: ['popup'],
    cache: false,
  }),



  process.env.GZIP && new CompressionPlugin({
    filename: '[name].[ext].gz',
    // test: /\.js$|\.css$|\.html$/,
    algorithm: 'gzip',
  }),
  // function () {
  //   this.hooks.done.tap('logGzipFolder', stats => {
  //     const gzipFolder = stats.compilation.options.plugins.filter(
  //       plugin => plugin instanceof CompressionPlugin
  //     )[0].filename;
  // const gzipFolderName = path.dirname(gzipFolder);
  // console.log('\x1b[32m[Webpack]\x1b[0m', `Output directory: ${stats.compilation.outputOptions.path}`);
  // console.log('\x1b[32m[Webpack]\x1b[0m', `Gzip folder: ${gzipFolderName}`);
  //   });
  // },



  isBundleAnalyzerEnabled && new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    generateStatsFile: true,
    openAnalyzer: process.env.BUNDLE_OPEN,
    statsFilename: './reports/stats.json',

  }),
  function () {
    this.hooks.done.tap('logBundleSize', stats => {
      const { assets } = stats.toJson({ source: false, modules: false });
      const totalSize = assets.reduce((acc, asset) => acc + asset.size, 0);

      setTimeout(() => {
        consoleUtil.log(`\x1b[44mTotal bundle size: ${totalSize} bytes\x1b[0m`);
        consoleUtil.log(`\x1b[35mTotal bundle size: ${(totalSize / 1000).toFixed(2)} KB\x1b[0m`);
        consoleUtil.log(`\x1b[36mTotal bundle size: ${(totalSize / 1000000).toFixed(2)} MB\x1b[0m`);
      }, 1000); // delay logging by 2 seconds
    });
  },




];