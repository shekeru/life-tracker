const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/App.js',
   output: {
      filename: 'main.js'
   },
   devServer: {
      inline: true,
      port: 1337
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
         },
         {
           test: /\.html$/,
           use: [
             {
               loader: "html-loader"
             }
           ]
      }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}
