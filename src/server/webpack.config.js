const path = require('path')
const fs = require('fs')

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, 'src', 'server'),
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve('dist', 'server'),
    filename: 'server.bundle.js'
  },
  externals: fs.readdirSync('node_modules')
  .reduce(function (acc, mod) {
    if (mod === '.bin') {
      return acc
    }

    acc[mod] = 'commonjs ' + mod
    return acc
  }, {}),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  devtool: 'eval'
}
