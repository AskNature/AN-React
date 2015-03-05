/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/strategy');

var routes = function (app) {
  app.get('/admin/strategies', Controller.loadindex);
  app.get('/api/strategies', Controller.returnList);

  app.get('/strategy/:id', Controller.loadindex);
  app.get('/api/strategy/:id', Controller.returnItem);

  app.post('/api/strategy/:id', Controller.updateStrategy);

  app.get('/api/testStrategy', Controller.testStrategyModel);
  app.get('/api/v2/strategies/:id', Controller.returnItem2);
  app.post('/api/v2/strategies/:id', Controller.updateItem2);
  app.post('/api/v2/strategies', Controller.createItem2);
  app.delete('/api/v2/strategies/:id', Controller.deleteItem2);
};

module.exports = routes;
