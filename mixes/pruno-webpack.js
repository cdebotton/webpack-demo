"use strict";

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var pwd = require('shelljs').pwd;

function WebpackTask(params) {
  this.params = (params || {});
};

WebpackTask.getDefaults = function() {
  return {
    entry: '::src/index.js',
    dist: '::dist/bundle.js'
  };
};

WebpackTask.prototype.enqueue = function(gulp, params, callback) {
  var opts = buildConfig(params);
  webpack(opts);
  return callback();
};

WebpackTask.prototype.generateWatcher = function(gulp, params, callback) {
  return function() {
    var opts = buildConfig(params);

    return new WebpackDevServer(webpack(opts), {
      publicPath: opts.output.publicPath,
      hot: true,
      inline: true,
      progress: true
    }).listen(9000, 'localhost', function (err, result) {
      if (err) console.error(err);

      console.log('WebpackDevServer started at http://localhost:9000');
    });
  };
};

function buildConfig(params) {
  return {
    context: path.join(__dirname, '..'),

    entry: {
      bundle: [
        'webpack-dev-server/client?http://localhost:9000/',
        'webpack/hot/only-dev-server',
        params.entry
      ]
    },

    output: {
      filename: 'bundle.js',
      path: path.join(pwd(), params.dist),
      publicPath: 'http://localhost:9000/dist/'
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],

    resolve: {
      extensions: ['', '.js', '.jsx', '.es6']
    },

    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', '6to5'], exclude: /node_modules|(src\/stores)/ },
        { test: /\.js$/, loaders: ['6to5'], include: /src\/stores/ }
      ]
    }
  }
};

module.exports = WebpackTask;
