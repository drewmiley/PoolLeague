var webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'poolLeague.js'
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.es6|js|tag$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({riot: 'riot'})
  ]
};
