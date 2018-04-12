const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
   template: './public/index.html',
   filename: 'index.html',
   inject: 'body'
});

const imgLoader = {
   loader: 'url-loader',
   options: {
      limit: 8000,
      name: 'static/media/[hash]-[name].[ext]'
   }
}

const fontLoader = {
   loader: 'url-loader',
   options: {
      name: 'fonts/[name].[ext]'
   }
}

module.exports = {
   entry: path.resolve(__dirname, '../src/index.js'),
   output: {
      publicPath: '/'
   },
   module: {
      rules: [
         { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }], exclude: /node_modules/ },
         { test: /\.css$/, use: ['style-loader', 'css-loader'] },
         { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
         { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
         { test: /\.(png|jp(e*)g|svg|ico)$/, use: [imgLoader] },
         { test: /\.(ttf|eot|woff|woff2)$/, use: [fontLoader] },
      ],
   },
   plugins: [HtmlWebpackPluginConfig],
   resolve: {
      alias: {
         '~': path.resolve(__dirname, '../src'),
         'request$': 'xhr',
         '../../theme.config$': path.join(__dirname, '../pesawise-semantic/theme.config'),
      }
   },
}