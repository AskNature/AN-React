/**
* User Routes
*/

'use strict';

var Controller = require('../controllers/user');

var routes = function (app) {
  app.get('/api/user', Controller.returnUser);
  app.post('/api/user', Controller.updateUser);
  app.get('/api/user/logout', Controller.logout);
  app.post('/api/user/create', Controller.createUser);
  app.post('/api/user/forgot', Controller.forgotUser);
  app.post('/api/user/reset', Controller.resetUser);

  app.get('/admin/users', Controller.loadindex);
  app.get('/api/users', Controller.returnList);

  app.get('/user/:id', Controller.loadindex);
  app.get('/api/user/:id', Controller.returnItem);
};

module.exports = routes;
