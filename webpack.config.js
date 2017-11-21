const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const VENDOR_LIBS = [
  'react', 'react-dom', 'apollo-client', 'react-apollo'
]

const cssFilename = 'css/main.css';
const distPath = 'dist';

module.exports = {
  // entry: './src/index.js',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  // output: {
  //   path: '/',
  //   filename: './dist/bundle.js'
  // },
  output: {
    path: path.resolve(__dirname, distPath),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      // {
      //   use: ['style-loader', 'css-loader'],
      //   test: /\.css$/
      // },
      // {
      //   test: /\.scss$/,
      //   use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
      // },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     loader: 'sass-loader'
      //   })
      // },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin(cssFilename),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  }
};
