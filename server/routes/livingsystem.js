/**
* Living System Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/livingsystem');

var routes = function (app) {
  app.get('/admin/livingsystems', Controller.loadindex);
  app.get('/livingsystem/:id', Controller.loadindex);

  // API v1
  app.get('/api/livingsystems', Controller.returnList1);
  app.get('/api/livingsystem/:id', Controller.returnItem1);
  app.post('/api/livingsystem/:id', Controller.updateLivingSystem1);

  // API v2
  app.get('/api/v2/livingsystems/:id', Controller.returnItem2);
  app.post('/api/v2/livingsystems/:id', Controller.updateItem2);
  app.delete('/api/v2/livingsystems/:id', Controller.deleteItem2);
  app.post('/api/v2/livingsystems', Controller.createItem2);
  app.delete('/api/v2/livingsystems', Controller.deleteMultiple2);
};

module.exports = routes;
