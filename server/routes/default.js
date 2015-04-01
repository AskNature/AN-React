/**
* Strategy Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Controller = require('../controllers/default');

var routes = function (app) {
  app.get('/list/:type', Controller.loadindex);
  app.get('/q/:type/:id', Controller.loadindex);
};

module.exports = routes;
