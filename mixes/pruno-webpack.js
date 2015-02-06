"use strict";

var util = require('gulp-util');
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
    dist: '::dist/bundle.js',
    uglify: false
  };
};

WebpackTask.prototype.enqueue = function(gulp, params, callback) {
  var opts = buildConfig(params, false);

  webpack(opts, function (err, stats) {
    if (err) throw new util.PluginError('pruno-webpack', err);

    util.log('[pruno-webpack]', stats.toString({
      progress: true,
      colors: true
    }));

    callback();
  });
};

WebpackTask.prototype.generateWatcher = function(gulp, params, callback) {
  return function() {
    var opts = buildConfig(params, true);

    return new WebpackDevServer(webpack(opts), {
      publicPath: opts.output.publicPath,
      hot: true,
      inline: true,
      noInfo: true,
      inlineSourceMaps: true,
      progress: true
    }).listen(9000, 'localhost', function (err, result) {
      if (err) console.error(err);

      console.log('WebpackDevServer started at http://localhost:9000');
    });
  };
};

function buildConfig(params, watch) {
  var DEV = process.env.NODE_ENV === 'development';
  var dist = params.dist.split('/');

  dist.pop();
  dist = dist.join('/');
  watch || (watch = false);

  return {
    cache: true,

    context: path.join(__dirname, '..'),

    devtool: watch ? '#eval-source-map' : 'eval',

    inlineSourceMaps: true,

    entry: {
      bundle: watch ? [
        'webpack-dev-server/client?http://localhost:9000/',
        'webpack/hot/only-dev-server',
        params.entry
      ] : params.entry
    },

    output: {
      filename: 'bundle.js',
      path: path.join(pwd(), dist),
      publicPath: 'http://localhost:9000/dist/'
    },

    plugins: watch ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ],

    resolve: {
      extensions: ['', '.js', '.jsx', '.es6']
    },

    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', '6to5'], exclude: /node_modules/ }
      ]
    }
  }
};

module.exports = WebpackTask;
