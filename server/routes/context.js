/**
* context Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/context');

var routes = function (app) {
  app.get('/admin/context', Controller.loadindex);
  app.get('/context/:id', Controller.loadindex);

  // API v1
  app.get('/api/context', Controller.returnList1);
  app.get('/api/context/:id', Controller.returnItem1);
  app.post('/api/context/:id', Controller.updateContext1);

  // API v2
  app.get('/api/v2/context/:id', Controller.returnItem2);
  app.post('/api/v2/context/:id', Controller.updateItem2);
  app.delete('/api/v2/context/:id', Controller.deleteItem2);
  app.post('/api/v2/context', Controller.createItem2);
  app.delete('/api/v2/context', Controller.deleteMultiple2);
};

module.exports = routes;
