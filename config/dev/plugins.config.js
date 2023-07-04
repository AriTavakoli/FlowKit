var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  consoleUtil = require('../utils/consoleUtil'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config()
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const plugins = require('./plugins.config');

const ASSET_PATH = process.env.ASSET_PATH || '../../';




const isBundleAnalyzerEnabled = process.env.BUNDLE_ANALYZER === 'true';

console.log(isBundleAnalyzerEnabled, 'is the bundle analyzer enabled?');
if (isBundleAnalyzerEnabled) {
  consoleUtil.log('Bundle analyzer is enabled');
}


if (process.env.NODE_ENV === 'production') {
  consoleUtil.logEnvironment();
} else {
  consoleUtil.log('Running in development mode');
}

const isDevelopment = process.env.NODE_ENV !== 'production';


module.exports = [

  isDevelopment && new ReactRefreshWebpackPlugin(),
  new CleanWebpackPlugin({ verbose: false }),
  new webpack.ProgressPlugin(),

  new webpack.ProvidePlugin({
    React: 'react',
  }),


  isBundleAnalyzerEnabled && new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
    openAnalyzer: false,
    statsFilename: './reports/stats.json',
  }),

  function () {
    setTimeout(() => {
      this.hooks.done.tap('logBundleSize', stats => {
        const { assets } = stats.toJson({ source: false, modules: false });
        const totalSize = assets.reduce((acc, asset) => acc + asset.size, 0);
        consoleUtil.log(`\x1b[44mTotal bundle size: ${totalSize} bytes\x1b[0m`);
        consoleUtil.log(`\x1b[35mTotal bundle size: ${(totalSize / 1000).toFixed(2)} KB\x1b[0m`);
        consoleUtil.log(`\x1b[36mTotal bundle size: ${(totalSize / 1000000).toFixed(2)} MB\x1b[0m`);
      });
    }, 2000);

  },


  new webpack.ProvidePlugin({
    regeneratorRuntime: 'regenerator-runtime',
  }),


  // expose and write the allowed env vars on the compiled bun1dle
  new webpack.EnvironmentPlugin(['NODE_ENV']),


  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../dist/workerBundle.js'),
        to: path.resolve(__dirname, `../../build/`),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, process.env.NODE_ENV === 'development' ? '../../config/dev/manifest.json' : '../../config/prod/manifest.json'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        transform: function (content, path) {
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
        from: path.resolve(__dirname, '../../src/pages/Content/Service/db/IndexDb.js'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/pages/Content/scripts/colorPicker.js'),
        to: path.resolve(__dirname, '../../build'),
        force: true,
        // noErrorOnMissing: true
      },
    ],
  }),


  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../src/pages/Content/Service/worker.ts',),
        to: path.resolve(__dirname, '../../build'),
        force: true,
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
        from: path.resolve(__dirname, '../../src/assets/img/icon-129.png'),
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
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../../src', 'pages', 'Newtab', 'index.html'),
    filename: 'newtab.html',
    chunks: ['newtab'],
    cache: false,
  }),



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



  // new CompressionPlugin({
  //   filename: 'bundle.gz',
  //   // test: /\.js$|\.css$|\.html$/,

  //   algorithm: 'gzip',
  // }),
  // function () {
  //   this.hooks.done.tap('logGzipFolder', stats => {
  //     const gzipFolder = stats.compilation.options.plugins.filter(
  //       plugin => plugin instanceof CompressionPlugin
  //     )[0].filename;
  // const gzipFolderName = path.dirname(gzipFolder);
  // console.log('\x1b[32m[Webpack]\x1b[0m', `Output directory: ${stats.compilation.outputOptions.path}`);
  // console.log('\x1b[32m[Webpack]\x1b[0m', `Gzip folder: ${gzipFolderName}`);
  //   });
  // }












  // new HtmlWebpackPlugin({
  //   template: path.join(__dirname, '../src', 'pages', 'Devtools', 'index.html'),
  //   filename: 'devtools.html',
  //   chunks: ['devtools'],
  //   cache: false,
  // }),
  // new HtmlWebpackPlugin({
  //   template: path.join(__dirname, '../src', 'pages', 'Panel', 'index.html'),
  //   filename: 'panel.html',
  //   chunks: ['panel'],
  //   cache: false,
  // }),






]