const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

process.env.NODE_ENV = 'production';

let plugins = [new CleanWebpackPlugin()];

if (!process.env.CI) {
  plugins = plugins.concat([new BundleAnalyzerPlugin()]);
}

module.exports = {
  mode: 'production',
  // optimization: {
  //   minimize: false,
  // },
  entry: {
    core: [
      './packages/core/dictionary',
      './packages/core/rules',
      './packages/core/getRules',
    ],
    vue: ['./packages/vue', './packages/vue/FieldMixin'],
    react: ['./packages/react/useForm', './packages/react/useField'],
    vanilla: [
      './packages/vanilla',
      './packages/vanilla/Validateme',
      './packages/vanilla/ValidatemeField',
    ],
  },
  externals: {
    react: 'react',
    vue: 'vue',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
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
        test: /\.css$/,
        use: ['cache-loader', 'style-loader', 'css-loader'],
      },
    ],
  },
};
