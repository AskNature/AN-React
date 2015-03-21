/**
* condition Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/condition');

var routes = function (app) {
  app.get('/admin/conditions', Controller.loadindex);
  app.get('/condition/:id', Controller.loadindex);

  // API v1
  app.get('/api/conditions', Controller.returnList1);
  app.get('/api/condition/:id', Controller.returnItem1);
  app.post('/api/condition/:id', Controller.updateCondition1);

  // API v2
  app.get('/api/v2/conditions/:id', Controller.returnItem2);
  app.post('/api/v2/conditions/:id', Controller.updateItem2);
  app.delete('/api/v2/conditions/:id', Controller.deleteItem2);
  app.post('/api/v2/conditions', Controller.createItem2);
  app.delete('/api/v2/conditions', Controller.deleteMultiple2);
};

module.exports = routes;
