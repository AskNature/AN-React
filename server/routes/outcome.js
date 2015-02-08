/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var focusController = require('../controllers/outcome');

var routes = function (app) {
  app.get('/admin/outcomes', focusController.loadindex, focusController.returnList);
  app.get('/api/outcomes', focusController.returnList);
};

module.exports = routes;
