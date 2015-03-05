'use strict';

var Controller = require('../controllers/product');

var routes = function (app) {
  app.get('/admin/products', Controller.loadindex);
  app.get('/api/products', Controller.returnList);

  app.get('/product/:id', Controller.loadindex);
  app.get('/api/product/:id', Controller.returnItem);

  app.get('/api/v2/products/:id', Controller.returnItem2);
  app.post('/api/v2/products/:id', Controller.updateItem2);
  app.post('/api/v2/products', Controller.createItem2);
  app.delete('/api/v2/products/:id', Controller.deleteItem2);
};

module.exports = routes;
