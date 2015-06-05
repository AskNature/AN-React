/**
* collection Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/collection');

var routes = function (app) {
  app.get('/admin/collection', Controller.loadindex);
  app.get('/collection/:id', Controller.loadindex);

  // API v1
  app.get('/api/collection', Controller.returnList1);
  app.get('/api/collection/:id', Controller.returnItem1);
  app.post('/api/collection/:id', Controller.updateCollection1);

  // API v2
  app.get('/api/v2/collection/:id', Controller.returnItem2);
  app.post('/api/v2/collection/:id', Controller.updateItem2);
  app.delete('/api/v2/collection/:id', Controller.deleteItem2);
  app.post('/api/v2/collection', Controller.createItem2);
  app.delete('/api/v2/collection', Controller.deleteMultiple2);
};

module.exports = routes;
