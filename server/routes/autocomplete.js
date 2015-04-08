/**
* Autocomplete Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var StrategyController = require('../controllers/bstrategy');

var DStrategy = require('../models/dstrategy.js');
var BStrategy = require('../models/bstrategy.js');

var DSystem = require('../models/dsystem.js');
var BSystem = require('../models/bsystem.js');

var FM = require('../models/fm.js');
var Context = require('../models/context.js');

var Researcher = require('../models/researcher.js');

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

  app.get('/api/v2/autocomplete/d.system', returnAutocomplete(DSystem));
  app.get('/api/v2/autocomplete/b.system', returnAutocomplete(BSystem));

  app.get('/api/v2/autocomplete/fm', returnAutocomplete(FM));
  app.get('/api/v2/autocomplete/context', returnAutocomplete(Context));

  app.get('/api/v2/autocomplete/researcher', returnAutocomplete(Researcher));

};

module.exports = routes;
