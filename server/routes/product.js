'use strict';

var Controller = require('../controllers/product');

var routes = function (app) {
  app.get('/admin/products', Controller.loadindex);
  app.get('/api/products', Controller.returnList);

  app.get('/product/:id', Controller.loadindex);
  app.get('/api/product/:id', Controller.returnItem);
};

module.exports = routes;
