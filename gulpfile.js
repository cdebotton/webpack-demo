"use strict";

var pruno = require('pruno');

var webpack = require('./mixes/pruno-webpack');
pruno.extend(webpack);

pruno(function(mix) {
  mix
    .configure({dir: __dirname + '/config'})
      .webpack()
      .http()
      .jade()
      .publish()
      .stylus();
});
