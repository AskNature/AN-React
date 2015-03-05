/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/strategy');

var routes = function (app) {
  app.get('/admin/strategies', Controller.loadindex);
  app.get('/strategy/:id', Controller.loadindex);

  // API v1
  app.get('/api/strategies', Controller.returnList1);
  app.get('/api/strategy/:id', Controller.returnItem1);
  app.post('/api/strategy/:id', Controller.updateStrategy1);

  // API v2
  app.get('/api/v2/strategies/:id', Controller.returnItem2);
  app.post('/api/v2/strategies/:id', Controller.updateItem2);
  app.delete('/api/v2/strategies/:id', Controller.deleteItem2);
  app.post('/api/v2/strategies', Controller.createItem2);
};

module.exports = routes;
