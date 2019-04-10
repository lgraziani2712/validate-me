const path = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([new BundleAnalyzerPlugin()]);
}

module.exports = {
  entry: './src',
  mode: 'development',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['cache-loader', 'style-loader', 'css-loader'],
      },
    ],
  },
};
