'use strict';

var Controller = require('../controllers/dstrategy');

var routes = function (app) {
  app.get('/admin/d.strategy', Controller.loadindex);
  app.get('/list/d.strategy', Controller.loadindex);
  app.get('/d.strategy/:id', Controller.loadindex);

  // API v1
  app.get('/api/d.strategy', Controller.returnList1);
  app.get('/api/d.strategy/:id', Controller.returnItem1);
  app.post('/api/d.strategy/:id', Controller.updateDStrategy1);

  // API v2
  app.get('/api/v2/d.strategy/:id', Controller.returnItem2);
  app.post('/api/v2/d.strategy/:id', Controller.updateItem2);
  app.delete('/api/v2/d.strategy/:id', Controller.deleteItem2);
  app.post('/api/v2/d.strategy', Controller.createItem2);
};

module.exports = routes;
