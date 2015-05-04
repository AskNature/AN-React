/**
* Search Routes
*/

'use strict';

var Controller = require('../controllers/search');

var routes = function (app) {
  app.get('/search/:type/:query', Controller.searchQuery);
};

module.exports = routes;
