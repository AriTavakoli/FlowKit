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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const colors = require('colors');
const TreeShaking = require('../prod/treeShaking');
const pluginsProd = require('./plugins.prod');
const Loaders = require('./loaders.prod');
const LogBundleSize = require('../utils/Logger');
const { splitChunks } = require('./splitChunks.prod');


const ASSET_PATH = process.env.ASSET_PATH || '../../';


const isBundleAnalyzerEnabled = process.env.BUNDLE_ANALYZER === 'true';

process.env.NODE_ENV = 'production'


if (process.env.NODE_ENV === 'production') {
  consoleUtil.log("[Environment]".blue.padEnd(20) + "      : " + process.env.NODE_ENV.yellow);
} else {
  consoleUtil.log('Running in development mode'.padEnd(28));
}
consoleUtil.log(`\x1b[32m[Bundle analyzer]\x1b[0m  : ${isBundleAnalyzerEnabled ? 'enabled'.green : 'disabled'.red}`);


const alias = {

  '@Context': path.resolve(__dirname, '../../src/components/Context/'),
  '@SearchHeader': path.resolve(__dirname, '../../src/components/SearchHeader/'),
  '@Hooks': path.resolve(__dirname, '../../src/components/hooks/'),
  '@Utils': path.resolve(__dirname, '../../src/utils/'),
  '@IconWrapper': path.resolve(__dirname, '../../src/components/IconWrapper'),
  '@Assets': path.resolve(__dirname, '../../src/assets/'),
  '@Features': path.resolve(__dirname, '../../src/components/Features/'),
  '@CodeEditor': path.resolve(__dirname, '../../src/components/CodeEditor/'),
  '@Mocks': path.resolve(__dirname, '../../Mocks/'),
  "@src": path.resolve(__dirname, '../../src/'),
  "@Global": path.resolve(__dirname, '../../src/global/'),
  "@Theme": path.resolve(__dirname, '../../src/global/theme'),
};


// load the secrets
var secretsPath = path.join(__dirname, 'secrets.' + process.env.NODE_ENV + '.js');

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

var options = {


  mode: process.env.NODE_ENV || 'development',
  entry: {
    // newtab: path.join(__dirname, '../../src', 'pages', 'Newtab', 'index.tsx'),
    options: path.join(__dirname, '../../src', 'pages', 'Options', 'index.tsx'),
    popup: path.join(__dirname, '../../src', 'pages', 'Popup', 'index.tsx'),
    background: path.join(__dirname, '../../src', 'pages', 'Background', 'index.ts'),
    contentScript: path.join(__dirname, '../../src', 'pages', 'Content', 'index.tsx'),
    // devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    // panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx'),
  },


  // --------Optimization---------

  optimization: {
    ...TreeShaking,

      splitChunks: {
        chunks(chunk) {
          // Exclude contentScript from the splitting process
          return chunk.name !== 'contentScript' && chunk.name !== 'background';
        },
        maxInitialRequests: Infinity,

        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageNameMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = packageNameMatch ? packageNameMatch[1] : 'unknown';
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
          common: {
            test: /[\\/]src[\\/](common|shared)[\\/]/,
            name: 'common',
            chunks: 'all',
            priority: -10,
            minChunks: 2,
            reuseExistingChunk: true,
          },

        },
      },

  },

  // --------Loaders---------

  module: { rules: [...Loaders] },


  // --------Output---------

  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: ASSET_PATH,
  },

  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },



  // --------Plugins---------

  plugins: [
    ...pluginsProd,

    {
      apply: function (compiler) {
        compiler.hooks.done.tap('logBundleSize', LogBundleSize.bind(this));
      },
    },


  ].filter(Boolean),
  infrastructureLogging: {
    level: 'info',
  },
};



module.exports = options;
