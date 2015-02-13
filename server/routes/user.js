/**
* User Routes
*/

'use strict';

var userController = require('../controllers/user');

var routes = function (app) {
  app.get('/api/user', userController.returnUser);
  app.post('/api/user', userController.updateUser);
};

module.exports = routes;
