/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/user');

var routes = function (app) {
  app.get('/admin/users', Controller.loadindex);
  app.get('/user/:id', Controller.loadindex);

  // API v1
  app.get('/api/users', Controller.returnList1);
  app.get('/api/users/:id', Controller.returnItem1);
  app.post('/api/users/:id', Controller.updateUser1);

  // API v2
  app.get('/api/v2/users/:id', Controller.returnItem2);
  app.post('/api/v2/users/:id', Controller.updateItem2);
  app.delete('/api/v2/users/:id', Controller.deleteItem2);
  app.post('/api/v2/users', Controller.createItem2);
  app.delete('/api/v2/users', Controller.deleteMultiple2);
};

module.exports = routes;
