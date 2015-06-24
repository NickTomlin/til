'use strict';

var supertest = require('supertest');

// WARNING here be hackz WARNING
// this is filthy filthy wrapper around superagent
// to attempt to set some defaults for each request.
// I didn't like what other wrappers where doing, so I did it myself :|

function baseRequest (app, transformer, method, url) {
  if (method && typeof url === 'undefined') {
    url = method;
    method = 'get';
  }

  var req = supertest(app)[method](url);

  if (transformer) {
    transformer(req);
  }

  return req;
}


module.exports = function (app, transformer) {
  if (!app) { throw new Error('request requires token to be set'); }
  var request = baseRequest.bind(null, app, transformer);

  request.get = function (url) {
    return request('get', url);
  };

  request.head = function (url) {
    return request('head', url);
  };

  request.del = function (url) {
    return request('delete', url);
  };

  request.patch = function (url) {
    return request('patch', url);
  };

  request.post = function (url) {
    return request('post', url);
  };

  request.put = function (url) {
    return request('put', url);
  };

  return request;
};
