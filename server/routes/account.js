/**
* User Routes
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
};

module.exports = routes;
