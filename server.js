"use strict";

var koa = require('koa');
var serveStatic = require('koa-static');
var compress = require('koa-compress');
var isomorphic = require('koa-isomorphic');
var bodyparser = require('koa-bodyparser');
var json = require('koa-json');

var app = koa();

require('6to5/register');

app.use(compress());
app.use(bodyparser());
app.use(json({pretty: false}));
app.use(serveStatic(__dirname + '/dist'));
app.use(isomorphic(__dirname + '/src/routes'));

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(err) {
  if (err) throw err;

  console.log('Listening on http://localhost:%d', PORT);
});
