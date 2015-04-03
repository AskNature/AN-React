/**
* Living System Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/bsystem');

var routes = function (app) {
  app.get('/admin/b.system', Controller.loadindex);
  app.get('/b.system/:id', Controller.loadindex);

  // API v1
  app.get('/api/b.system', Controller.returnList1);
  app.get('/api/b.system/:id', Controller.returnItem1);
  app.post('/api/b.system/:id', Controller.updateBSystem1);

  // API v2
  app.get('/api/v2/b.system/:id', Controller.returnItem2);
  app.post('/api/v2/b.system/:id', Controller.updateItem2);
  app.delete('/api/v2/b.system/:id', Controller.deleteItem2);
  app.post('/api/v2/b.system', Controller.createItem2);
  app.delete('/api/v2/b.system', Controller.deleteMultiple2);
};

module.exports = routes;
