/**
* Strategy Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/bstrategy');

var routes = function (app) {
  app.get('/admin/b.strategy', Controller.loadindex);
  app.get('/b.strategy/:id', Controller.loadindex);

  // API v1
  app.get('/api/b.strategy', Controller.returnList1);
  app.get('/api/b.strategy/:id', Controller.returnItem1);
  app.post('/api/b.strategy/:id', Controller.updateBStrategy1);

  // API v2
  app.get('/api/v2/b.strategy/:id', Controller.returnItem2);
  app.post('/api/v2/b.strategy/:id', Controller.updateItem2);
  app.delete('/api/v2/b.strategy/:id', Controller.deleteItem2);
  app.post('/api/v2/b.strategy', Controller.createItem2);
  app.delete('/api/v2/b.strategy', Controller.deleteMultiple2);
};

module.exports = routes;
