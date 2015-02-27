/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/media');

var routes = function (app) {
  app.get('/admin/media', Controller.loadindex);
  app.get('/api/media', Controller.returnList);

  app.get('/media/:id', Controller.loadindex);
  app.get('/api/media/:id', Controller.returnItem);
};

module.exports = routes;
