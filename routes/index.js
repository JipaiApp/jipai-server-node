'use strict';

var Router = require('koa-router')
  , mount = require('koa-mount')
  , api_v1 = require('../controllers/api_v1')
  , web = require('../controllers/web')
  , limit = require('koa-better-ratelimit')
  , config = require('../config')
  , error = require('../error');

module.exports = function (app) {
  // RateLimit
  app.use(limit({
    duration: 1000 * 60 * 60 * 1, // 1 hour
    max: 2000   // max to 1000 requests per ip
  }));

  // API
  var api_v1Router = new Router();

  api_v1Router
    .post('/streams', api_v1.createNewStream)
    .get('/streams/:id', api_v1.getStream)
    .get('/streams/:id/urls', api_v1.getUrls);

  // Web
  var webRouter = new Router();

  webRouter
    .get('/streams/:id', web.getStream);

  // Error handler
  app.use(error());

  // Mount middleware
  app.use(mount('/' + config.api_version, api_v1Router.middleware()))
     .use(mount('/', webRouter.middleware()));
}
