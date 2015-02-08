/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var focusController = require('../controllers/strategy');

var routes = function (app) {
  app.get('/admin/strategies', focusController.loadindex, focusController.returnList);
  app.get('/api/strategies', focusController.returnList);
};

module.exports = routes;
