/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/user');

var routes = function (app) {
  app.get('/user/:id', Controller.loadindex);

  // API v1
  app.get('/api/user', Controller.returnList1);
  app.get('/api/user/:id', Controller.returnItem1);
  app.post('/api/user/:id', Controller.updateUser1);

  // API v2
  app.get('/api/v2/user/:id', Controller.returnItem2);
  app.post('/api/v2/user/:id', Controller.updateItem2);
  app.delete('/api/v2/user/:id', Controller.deleteItem2);
  app.post('/api/v2/user', Controller.createItem2);
  app.delete('/api/v2/user', Controller.deleteMultiple2);
};

module.exports = routes;
