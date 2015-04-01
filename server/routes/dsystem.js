/**
* Living System Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/dsystem');

var routes = function (app) {
  app.get('/admin/d.system', Controller.loadindex);
  app.get('/d.system/:id', Controller.loadindex);

  // API v1
  app.get('/api/d.system', Controller.returnList1);
  app.get('/api/d.system/:id', Controller.returnItem1);
  app.post('/api/d.system/:id', Controller.updateDSystem1);

  // API v2
  app.get('/api/v2/d.system/:id', Controller.returnItem2);
  app.post('/api/v2/d.system/:id', Controller.updateItem2);
  app.delete('/api/v2/d.system/:id', Controller.deleteItem2);
  app.post('/api/v2/d.system', Controller.createItem2);
  app.delete('/api/v2/d.system', Controller.deleteMultiple2);
};

module.exports = routes;
