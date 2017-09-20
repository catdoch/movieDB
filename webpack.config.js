var path = require('path');
 var webpack = require('webpack');
     
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
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };