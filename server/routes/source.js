/**
* source Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/source');

var routes = function (app) {
  app.get('/admin/source', Controller.loadindex);
  app.get('/source/:id', Controller.loadindex);

  // API v1
  app.get('/api/source', Controller.returnList1);

  // API v2
  app.get('/api/v2/source/:id', Controller.returnItem2);
  app.post('/api/v2/source/:id', Controller.updateItem2);
  app.delete('/api/v2/source/:id', Controller.deleteItem2);
  app.post('/api/v2/source', Controller.createItem2);
  app.delete('/api/v2/source', Controller.deleteMultiple2);
};

module.exports = routes;
