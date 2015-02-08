/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var focusController = require('../controllers/product');

var routes = function (app) {
  app.get('/admin/products', focusController.loadindex, focusController.returnList);
  app.get('/api/products', focusController.returnList);
};

module.exports = routes;
