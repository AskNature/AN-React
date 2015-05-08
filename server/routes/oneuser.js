/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/oneuser');

var routes = function (app) {
  app.get('/1user/:id', Controller.loadindex);

  // API v1
  app.get('/api/1user', Controller.returnList1);

  // API v2
  app.get('/api/v2/1user/:id', Controller.returnItem2);
  app.post('/api/v2/1user/:id', Controller.updateItem2);
  app.delete('/api/v2/1user/:id', Controller.deleteItem2);
  app.post('/api/v2/1user', Controller.createItem2);
  app.delete('/api/v2/1user', Controller.deleteMultiple2);
};

module.exports = routes;
