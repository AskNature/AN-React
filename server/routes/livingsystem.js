'use strict';

var Controller = require('../controllers/livingsystem');

var routes = function (app) {
  app.get('/admin/living-systems', Controller.loadindex);
  app.get('/api/living-systems', Controller.returnList);

  app.get('/living-system/:id', Controller.loadindex);
  app.get('/api/living-system/:id', Controller.returnItem);
};

module.exports = routes;
