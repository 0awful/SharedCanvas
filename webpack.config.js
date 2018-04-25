const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  context: __dirname,
  mode: 'development',
  entry: ['./js/ClientApp.jsx'],
  devtool:
    process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  plugins: [
    // getting this working decreases bundle by 70 kb and compressed bundle by 10kb
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ecma: 8,
    //     warnings: true,
    //     parse: {},
    //     compress: {},
    //     mangle: {
    //       properties: {
    //         // mangle property options
    //       }
    //     },
    //     output: {
    //       comments: false,
    //       beautify: false
    //     },
    //     toplevel: false,
    //     nameCache: null,
    //     ie8: false,
    //     keep_classnames: undefined,
    //     keep_fnames: false,
    //     safari10: false
    //   }
    // }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('js'),
          path.resolve('node_modules/preact-compat/src')
        ]
      }
    ]
  }
};

module.exports = config;
