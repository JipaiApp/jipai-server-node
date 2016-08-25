'use strict';

var Pili = require('pili')
  , thunkify = require('thunkify')
  , config = require('../config');

var ACCESS_KEY = config.qiniu.ak;
var SECRETE_KEY = config.qiniu.sk;

var HUB = config.qiniu.hub;

var credentials = new Pili.Credentials(ACCESS_KEY, SECRETE_KEY);
var hub = new Pili.Hub(credentials, HUB);

function _createStream(options) {
  return function (done) {
    hub.createStream(options, done);
  }
};

function _getStream(streamId) {
  return function (done) {
    hub.getStream(streamId, done);
  }
}

exports.createNewStream = function *(next) {
  try {
    this.set('Content-Type', 'application/json');

    var stream = yield _createStream(null);
    this.body = stream.toJSONString();
  } catch (e) {
    this.throw(500, 'failed to create a stream');
  } finally {
  }
}

exports.getStream = function *(next) {
  var id = this.params.id;

  try {
    this.set('Content-Type', 'application/json');

    var stream = yield _getStream(id);
    this.body = stream.toJSONString();
  } catch (e) {
    this.throw(500, 'failed to get the stream');
  } finally {

  }
}

const ORIGIN = 'ORIGIN';

exports.getUrls = function *(next) {
  var id = this.params.id;
  var query = this.request.query;

  this.set('Content-Type', 'application/json');

  if (query.type != 'play') {
    this.throw(404, 'No urls found');
  } else {
    try {
      var stream = yield _getStream(id);

      var rtmpLiveUrl = stream.rtmpLiveUrls()[ORIGIN];
      var hlsLiveUrl = stream.hlsLiveUrls()[ORIGIN];
      var httpFlvLiveUrl = stream.httpFlvLiveUrls()[ORIGIN];

      var urls = {
        rtmp: rtmpLiveUrl,
        hls: hlsLiveUrl,
        flv: httpFlvLiveUrl
      }

      this.body = JSON.stringify(urls);
    } catch (e) {
      this.throw(500, 'failed to get the stream');
    } finally {}
  }
}
