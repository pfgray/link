
var webpack = require('webpack'),
    path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/client',
  target: __dirname + '/dist'
};

module.exports = {
    resolve: {
      extensions: ['', '.js', '.ts', '.tsx'],
      alias: {}
    },
    node: {
      fs: "empty"
    },

    debug: true,
    devtool: "#inline-source-map",

    entry: {
      main: [
        'webpack-dev-server/client?http://localhost:9001/',
        'webpack/hot/only-dev-server',
        PATHS.app + '/main.js'
      ]
    },
    output: {
        path: PATHS.target,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'react-hot!babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }),
        include: PATHS.client,
        exclude: /node_modules/,
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /(\.(eot.*|woff2?.*|ttf.*|svg.*)$|.(gif|png|jpg)$)/,
        loader: "url?limit=8192"
      }, {
        test: /\.jade$/,
        loader: "jade"
      }, {
        test: /\.json$/,
        loader: "json"
      },{
        test: /\.tsx?$/,
        loader: 'react-hot!babel?' + JSON.stringify({
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-1']
        }) + '!ts-loader',
        include: PATHS.client,
        exclude: /node_modules/,
      }]
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en$/),
      new webpack.HotModuleReplacementPlugin()
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
