'use strict';

/**
* Module dependencies.
*/

var http = require('http');

/**
* Expose `error`.
*/

module.exports = error;

function error() {
  // env
  var env = process.env.NODE_ENV || 'development';

  return function *error(next) {
    try {
      yield next;

      if (404 == this.response.status && !this.response.body) {
        this.throw(404);
      }
    } catch (err) {
      this.status = err.status || 500;

      // application
      this.app.emit('error', err, this);

      // accepted types
      switch (this.accepts('html', 'text', 'json')) {
        case 'text':
          if ('development' == env) {
            this.body = err.message;
          } else if (err.expose) {
            this.body = err.message;
          } else {
            throw err;
          }
          break;

        case 'json':
          if ('development' == env) {
            this.body = { message: err.message };
          } else if (err.expose) {
            this.body = { message: err.message };
          } else {
            this.body = { message: http.STATUS_CODES[err.status] };
          }
          break;

        case 'html':
          yield this.render('error', { message: err.message });
          break;
        }
      }
    }
  }
