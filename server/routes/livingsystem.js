/**
* Living System Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/livingsystem');

var routes = function (app) {
  app.get('/admin/living-systems', Controller.loadindex);
  app.get('/living-system/:id', Controller.loadindex);

  // API v1
  app.get('/api/living-systems', Controller.returnList1);
  app.get('/api/living-system/:id', Controller.returnItem1);
  app.post('/api/living-system/:id', Controller.updateLivingSystem1);

  // API v2
  app.get('/api/v2/living-systems/:id', Controller.returnItem2);
  app.post('/api/v2/living-systems/:id', Controller.updateItem2);
  app.delete('/api/v2/living-systems/:id', Controller.deleteItem2);
  app.post('/api/v2/living-systems', Controller.createItem2);
  app.delete('/api/v2/living-systems', Controller.deleteMultiple2);
};

module.exports = routes;
