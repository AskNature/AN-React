'use strict';

var Controller = require('../controllers/source');

var routes = function (app) {
  app.get('/admin/sources', Controller.loadindex);
  app.get('/api/sources', Controller.returnList);

  app.get('/source/:id', Controller.loadindex);
  app.get('/api/source/:id', Controller.returnItem);
};

module.exports = routes;
