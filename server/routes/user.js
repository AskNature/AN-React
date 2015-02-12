/**
* User Routes
*/

'use strict';

var userController = require('../controllers/user');

var routes = function (app) {
  app.get('/api/user', userController.returnUser);
};

module.exports = routes;
