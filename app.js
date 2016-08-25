'use strict';
var koa = require('koa')
  , routes = require('./routes/')
  , config = require('./config')
  , http = require('http')
  , logger = require('koa-logger')
  , bodyParser = require('koa-bodyparser');

var app = koa();

/**
 * logger
 */
if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

/**
 * body parser
 */
app.use(bodyParser());

/**
 * Router
 */
routes(app);

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
