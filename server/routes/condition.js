'use strict';

var Controller = require('../controllers/condition');

var routes = function (app) {
  app.get('/admin/conditions', Controller.loadindex);
  app.get('/api/conditions', Controller.returnList);

  app.get('/condition/:id', Controller.loadindex);
  app.get('/api/condition/:id', Controller.returnItem);
};

module.exports = routes;
