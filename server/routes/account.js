/**
* User Routes
*/

'use strict';

var userController = require('../controllers/account');

var routes = function (app) {
  app.get('/login', userController.login);
  app.get('/signup', userController.login);
  app.get('/settings', userController.editSettings);
};

module.exports = routes;
