/**
* Autocomplete Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var Content = require('../models/content.js');

var DStrategy = require('../models/dstrategy.js');
var BStrategy = require('../models/bstrategy.js');
var Strategy = require('../models/strategy.js');

var DSystem = require('../models/dsystem.js');
var BSystem = require('../models/bsystem.js');

var FM = require('../models/fm.js');
var Context = require('../models/context.js');

var Source = require('../models/source.js');
var Researcher = require('../models/researcher.js');

var Media = require('../models/media.js');

var returnAutocomplete = function(model) {
    return function(req, res, next) {
	var suggestions = model.findAutocomplete(req.query.query, req.query.count, function(result) {
	    res.status(200).json({results: result});
	});
    };
};

var routes = function (app) {
  // API v2
  app.get('/api/v2/autocomplete/content', returnAutocomplete(Content));

  app.get('/api/v2/autocomplete/d.strategy', returnAutocomplete(DStrategy));
  app.get('/api/v2/autocomplete/b.strategy', returnAutocomplete(BStrategy));
  app.get('/api/v2/autocomplete/strategy', returnAutocomplete(Strategy));

  app.get('/api/v2/autocomplete/d.system', returnAutocomplete(DSystem));
  app.get('/api/v2/autocomplete/b.system', returnAutocomplete(BSystem));

  app.get('/api/v2/autocomplete/fm', returnAutocomplete(FM));
  app.get('/api/v2/autocomplete/context', returnAutocomplete(Context));

  app.get('/api/v2/autocomplete/source', returnAutocomplete(Source));
  app.get('/api/v2/autocomplete/researcher', returnAutocomplete(Researcher));

  app.get('/api/v2/autocomplete/media', returnAutocomplete(Media));


};

module.exports = routes;
