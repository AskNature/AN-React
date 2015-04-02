'use strict';

var Controller = require('../controllers/product');

var routes = function (app) {
  app.get('/admin/products', Controller.loadindex);
  app.get('/product/:id', Controller.loadindex);

  // API v1
  app.get('/api/products', Controller.returnList1);
  app.get('/api/product/:id', Controller.returnItem1);
  app.post('/api/product/:id', Controller.updateProduct1);

  // API v2
  app.get('/api/v2/products/:id', Controller.returnItem2);
  app.post('/api/v2/products/:id', Controller.updateItem2);
  app.delete('/api/v2/products/:id', Controller.deleteItem2);
  app.post('/api/v2/products', Controller.createItem2);
};

module.exports = routes;
