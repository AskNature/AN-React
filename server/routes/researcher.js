/**
* Researcher Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/researcher');

var routes = function (app) {
  app.get('/admin/researchers', Controller.loadindex);
  app.get('/researcher/:id', Controller.loadindex);

  // API v1
  app.get('/api/researchers', Controller.returnList1);
  app.get('/api/researcher/:id', Controller.returnItem1);
  app.post('/api/researcher/:id', Controller.updateResearcher1);

  // API v2
  app.get('/api/v2/researchers/:id', Controller.returnItem2);
  app.post('/api/v2/researchers/:id', Controller.updateItem2);
  app.delete('/api/v2/researchers/:id', Controller.deleteItem2);
  app.post('/api/v2/researchers', Controller.createItem2);
  app.delete('/api/v2/researchers', Controller.deleteMultiple2);
};

module.exports = routes;
