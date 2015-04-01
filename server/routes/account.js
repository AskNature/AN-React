/**
* Account Routes
*/

'use strict';

var Controller = require('../controllers/account');

var routes = function (app) {
  app.get('/login', Controller.login);
  app.get('/signup', Controller.login);
  app.get('/settings', Controller.editSettings);
  app.get('/forgot', Controller.forgot);
  app.get('/reset/*', Controller.reset);
  app.get('/verify/:token', Controller.verify);

  app.get('/api/account', Controller.returnAccount);
  app.post('/api/account', Controller.updateAccount);
  app.get('/api/account/logout', Controller.logout);
  app.post('/api/account/create', Controller.createAccount);
  app.post('/api/account/forgot', Controller.forgotAccount);
  app.post('/api/account/reset', Controller.resetAccount);
};

module.exports = routes;
