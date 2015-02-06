"use strict";

var pruno = require('pruno');

var webpack = require('./mixes/pruno-webpack');
pruno.extend(webpack)

pruno(function(mix) {
  mix
    .configure({dir: __dirname + '/config'})
      .http({ file: './server.js' })
      .webpack()
      .publish()
      .stylus();
});
