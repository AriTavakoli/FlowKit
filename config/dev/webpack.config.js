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


const ASSET_PATH = process.env.ASSET_PATH || '../../';

const plugins = require('./plugins.config')



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



const alias = {

  '@Context': path.resolve(__dirname, '../../src/components/Context/'),
  '@SearchHeader': path.resolve(__dirname, '../../src/components/SearchHeader/'),
  '@Hooks': path.resolve(__dirname, '../../src/components/hooks/'),
  '@Utils': path.resolve(__dirname, '../../src/Utils/'),
  '@IconWrapper': path.resolve(__dirname, '../../src/components/IconWrapper'),
  '@Assets': path.resolve(__dirname, '../../src/assets/'),
  '@Features': path.resolve(__dirname, '../../src/components/Features/'),
  '@CodeEditor': path.resolve(__dirname, '../../src/components/CodeEditor/'),
  '@Mocks': path.resolve(__dirname, '../../Mocks/'),
  "@src": path.resolve(__dirname, '../../src/'),
  "@Global": path.resolve(__dirname, '../../src/global/'),
  "@Types": path.resolve(__dirname, '../../src/types/'),


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



// ======== Output Files =========

var options = {

  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, '../../src', 'pages', 'Newtab', 'index.tsx'),
    options: path.join(__dirname, '../../src', 'pages', 'Options', 'index.tsx'),
    popup: path.join(__dirname, '../../src', 'pages', 'Popup', 'index.tsx'),
    background: path.join(__dirname, '../../src', 'pages', 'Background', 'index.ts'),
    contentScript: path.join(__dirname, '../../src', 'pages', 'Content', 'index.tsx'),
    playground : path.join(__dirname, '../../src', 'pages', 'Playground', 'index.tsx'),
    // devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    // panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx'),
  },

  chromeExtensionBoilerplate: {

    notHotReload: ['contentScript', 'devtools', 'background'],

  },



  // ---------------------------------------------------------
  //  Output Files
  // ---------------------------------------------------------


  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, '../../build'),
    clean: true,
    publicPath: ASSET_PATH,
  },


  module: {
    rules: [

      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              filename: '[name].bundle.js',
              inline: true,
              fallback: false,
            },
          },
        ]
      },


      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      // new rule for SCSS modules with localized class names
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(
                  Boolean
                ),
              }),
              transpileOnly: process.env.TS_TRANSPILE_ONLY,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: require.resolve('babel-loader'),

            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },





  // ======== Plugins ==========
  plugins: [


    ...plugins,



  ].filter(Boolean),
  infrastructureLogging: {
    level: 'info',
  },
};

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
  // options.devtool = 'cheap-module-source-map';
  options.devtool = 'inline-source-map';
} else {
  options.devtool = 'source-map'; // Add this line for source maps in production
  options.optimization = {


    splitChunks: {
      chunks: 'all',

      cacheGroups: {

        background: {
          name: 'background',
          chunks: 'all',
          test: /pages[\\/]Background[\\/]/, // Match the file path of the background entry point
          priority: 10,
        },

      }
    },

    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: 4,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },

      }),
    ],
  };
}




module.exports = options;
