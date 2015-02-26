'use strict';

var Controller = require('../controllers/collection');

var routes = function (app) {
  app.get('/admin/collections', Controller.loadindex);
  app.get('/api/collections', Controller.returnList);

  app.get('/collection/:id', Controller.loadindex);
  app.get('/api/collection/:id', Controller.returnItem);
};

module.exports = routes;
