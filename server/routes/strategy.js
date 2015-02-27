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

  app.post('/api/strategy', Controller.updateStrategy);
};

module.exports = routes;
