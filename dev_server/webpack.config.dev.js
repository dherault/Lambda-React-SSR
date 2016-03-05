var path = require('path');
var webpack = require('webpack');
var config = require('./config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-hot-middleware/client?path=${config.url}__webpack_hmr`,
    path.resolve(__dirname, '../client/src/client.js')
  ],
  output: {
    path: path.resolve(__dirname, '../client/dist'),
    filename: 'bundle.js',
    publicPath: config.url
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-2', 'react', 'react-hmre']
      }
    },{ 
      test: /\.css$/, 
      loaders: ['style', 'css', 'postcss'],
      exclude: /node_modules/
    }]
  },
  postcss: function() {
    return [require('postcss-cssnext')];
  }
};
