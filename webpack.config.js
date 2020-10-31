const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/',
    port: 8080,
    proxy: {
      '/api': 'localhost:3000',
    },
  },
  // entry: './client/index.jsx',
  // output: {
  //   path: path.resolve(__dirname, 'build'),
  //   filename: 'bundle.js',
  // },
  // mode: process.env.NODE_ENV,
  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   // // Match the output path
  //   // contentBase: path.resolve(__dirname, 'build'),
  //   // Match the output 'publicPath'
  //   publicPath: '/',
  //   // // fallback to the root for other urls
  //   // historyApiFallback: true,
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //     secure: false,
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/i,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: ['.jsx'],
};
