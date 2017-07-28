var path = require('path');

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/js/',
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        exclude: /node_modules|public/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public')
  }
};
