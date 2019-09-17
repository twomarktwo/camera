const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    // hotload: 'webpack-hot-middleware/client?reload=true',
    app: './src/index.js',
    print: './src/print.js',
    quagga: './node_modules/quagga/dist/quagga.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin({reload: true}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};