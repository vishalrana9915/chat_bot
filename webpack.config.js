// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var config = {
   entry: './server.js',
   output: {
      path:'./dist',
      filename: 'bundle.js',
   },
   devServer: {
      inline: true,
      port: 8080,
      hot: true,
      contentBase: "./dist"
   },
   module: {
      loaders: [
         {
                test: /\.js?$/,
                exclude:/(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
      ]
   },
   plugins:[
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
   ]
}
module.exports = config;