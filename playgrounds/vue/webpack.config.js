const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const removeVueAttrPlugin = require('./removeVueAttrPlugin');

let plugins = [new VueLoaderPlugin()];

let modules = [];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([new BundleAnalyzerPlugin()]);
  modules = [removeVueAttrPlugin(['data-cy'])];
}

module.exports = {
  mode: 'development',
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
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
        test: /\.vue$/,
        use: [
          'cache-loader',
          {
            loader: 'vue-loader',
            options: {
              rootMode: 'upward',
              compilerOptions: {
                preserveWhitespace: false,
                modules,
              },
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
