const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src', 'client'),
  entry: path.resolve(__dirname, 'app.jsx'),
  output: {
    path: path.resolve('dist', 'client'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass']
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /.svg?$/,
      loader: 'raw-loader'
    }]
  },
  sassLoader: {
    includePaths: [path.resolve('node_modules'), path.resolve(__dirname, 'styles')]
  },
  devtool: 'eval'
}
