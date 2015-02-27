'use strict';

var Controller = require('../controllers/researcher');

var routes = function (app) {
  app.get('/admin/researchers', Controller.loadindex);
  app.get('/api/researchers', Controller.returnList);

  app.get('/researcher/:id', Controller.loadindex);
  app.get('/api/researcher/:id', Controller.returnItem);
};

module.exports = routes;
