/**
* Search Routes
*/

'use strict';

var Controller = require('../controllers/search');
var settings = require('../config/env/default');
var path = require('path');

var routes = function (app) {
  app.get('/api/v3/search/:query', Controller.searchWithQuery);
};

module.exports = routes;
