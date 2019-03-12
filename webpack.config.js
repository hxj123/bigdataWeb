const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js',
    chart: './src/js/chart.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'
  },
  module:{
      rules:[
          {
            test:/\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test:/\.(png|svg|jpg|gif)$/,
            use:[
              'file-loader'
            ]
          }
      ]
  }
};