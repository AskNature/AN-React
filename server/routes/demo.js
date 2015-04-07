/**
* User Routes
*/

'use strict';

var demoController = require('../controllers/demo');

var routes = function (app) {
  app.get('/infinite_demo/:id', demoController.infinite);
  app.get('/relationship_demo', demoController.relationships);
  app.get('/strategy_demo', demoController.strategy);
};

module.exports = routes;
