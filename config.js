'use strict';

var version = require('./package.json').version;
var path = require('path');

var config = {
  version: version,
  api_version: 'v1',
  debug: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8481,
  qiniu: {
    ak: 'QiniuAK',
    sk: 'QiniuSK',
    hub: 'PiliHubName'
  }
};

module.exports = config;
