/**
* Autocomplete Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var StrategyController = require('../controllers/bstrategy');

var DStrategy = require('../models/dstrategy.js');
var BStrategy = require('../models/bstrategy.js');
var Phenomenon = require('../models/phenomenon.js');

var returnAutocomplete = function(model) {
    return function(req, res, next) {
	var suggestions = model.findAutocomplete(req.query.query, req.query.count, function(result) {
	    res.status(200).json({results: result});
	});
    };
};

var routes = function (app) {
  // API v2
  app.get('/api/v2/autocomplete/d.strategy', returnAutocomplete(DStrategy));
  app.get('/api/v2/autocomplete/b.strategy', returnAutocomplete(BStrategy));
  app.get('/api/v2/autocomplete/functions', returnAutocomplete(Phenomenon));

};

module.exports = routes;
