const path = require('path');
const webpack = require('webpack');
     
 module.exports = {
     entry: './js/pages/app.js',
     output: {
         path: path.resolve(__dirname, 'build/js'),
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 exclude: /node_modules/
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };