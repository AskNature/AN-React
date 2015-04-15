/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/test');

var routes = function (app) {
  app.get('/test', Controller.testController);
  app.get('/test/:query', Controller.testControllerQuery);
  app.get('/testuser/:id', Controller.testUser);
};

module.exports = routes;
