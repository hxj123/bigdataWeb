const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
          }
      ]
  }
};