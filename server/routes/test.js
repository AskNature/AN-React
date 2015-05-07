/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/test');
var settings = require('../config/env/default');
var path = require('path');

var routes = function (app) {
  app.get('/test', Controller.testController);
  app.get('/test/:query', Controller.testControllerQuery);
  app.get(/search\/([^\/]+)(?:\/([\w-]+):([\w-]+))?/, function(req, res, next) {
      console.log('query: ' + req.params[0]);
      console.log('type: ' + req.params[1]);
      console.log('id: ' + req.params[2]);
      res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
  });
  app.get(/query:([^\/]+)(?:\/([\w-]+):([\w-]+))?/, function(req, res, next) {
      console.log('query: ' + req.params[0]);
      console.log('type: ' + req.params[1]);
      console.log('id: ' + req.params[2]);
      res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
  });
};

module.exports = routes;
