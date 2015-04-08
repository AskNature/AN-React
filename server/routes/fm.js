/**
* FM Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/fm');

var routes = function (app) {
  app.get('/admin/fm', Controller.loadindex);
  app.get('/fm/:id', Controller.loadindex);

  // API v1
  app.get('/api/fm', Controller.returnList1);

  // API v2
  app.get('/api/v2/fm/:id', Controller.returnItem2);
  app.post('/api/v2/fm/:id', Controller.updateItem2);
  app.post('/api/v2/fm', Controller.createItem2);
  app.delete('/api/v2/fm/:id', Controller.deleteItem2);
};

module.exports = routes;
