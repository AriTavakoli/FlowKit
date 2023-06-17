const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports =

  [

    {
      test: /\.(css|scss)$/,
      exclude: /\.module\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),  // use Dart Sass
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.module\.scss$/,
      use: [
        'style-loader',
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
            implementation: require('sass'),  // use Dart Sass
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
        },
      ],
      exclude: /node_modules/,
    },
  ];

