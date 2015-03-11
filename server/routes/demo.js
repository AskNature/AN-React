/**
* User Routes
*/

'use strict';

var demoController = require('../controllers/demo');

var routes = function (app) {
  app.get('/infinite_demo', demoController.infinite);
  app.get('/relationship_demo', demoController.relationships);
};

module.exports = routes;
