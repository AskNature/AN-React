/**
* Strategy Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/story');

var routes = function (app) {
  app.get('/admin/story', Controller.loadindex);
  app.get('/story/:id', Controller.loadindex);

  // API v1
  app.get('/api/story', Controller.returnList1);
  app.get('/api/story/:id', Controller.returnItem1);
  app.post('/api/story/:id', Controller.updateStory1);

  // API v2
  app.get('/api/v2/story/:id', Controller.returnItem2);
  app.post('/api/v2/story/:id', Controller.updateItem2);
  app.delete('/api/v2/story/:id', Controller.deleteItem2);
  app.post('/api/v2/story', Controller.createItem2);
  app.delete('/api/v2/story', Controller.deleteMultiple2);
};

module.exports = routes;
