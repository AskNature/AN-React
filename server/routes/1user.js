/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/oneuser');

var routes = function (app) {
  app.get('/1user/:id', Controller.loadindex);

  // API v1
  app.get('/api/1users', Controller.returnList1);
  app.get('/api/1users/:id', Controller.returnItem1);
  app.post('/api/1users/:id', Controller.updateUser1);

  // API v2
  app.get('/api/v2/1users/:id', Controller.returnItem2);
  app.post('/api/v2/1users/:id', Controller.updateItem2);
  app.delete('/api/v2/1users/:id', Controller.deleteItem2);
  app.post('/api/v2/1users', Controller.createItem2);
  app.delete('/api/v2/1users', Controller.deleteMultiple2);
};

module.exports = routes;
