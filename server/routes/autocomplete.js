/**
* Autocomplete Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var StrategyController = require('../controllers/strategy');

var Product = require('../models/product.js');

var returnAutocomplete = function(req, res, next) {
    var suggestions = Product.findAutocomplete(req.query.query, req.query.count, function(result) {
	res.status(200).json({results: result});
    });
    //res.status(200).json({results: [{name: "Stuff", masterid:"stuff"}, {name:"Something else", masterid:"something-else"}]});
};

var routes = function (app) {
  // API v2
  app.get('/api/v2/autocomplete/products', returnAutocomplete);
};

module.exports = routes;
