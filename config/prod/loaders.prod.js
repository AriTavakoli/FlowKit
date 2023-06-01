const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports =

  [

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

