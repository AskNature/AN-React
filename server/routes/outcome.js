/**
* Outcome Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var outcomes = require('../controllers/outcome');

var routes = function (app) {
  app.get('/outcome/all', outcomes.returnOutcomes);
};

module.exports = routes;
