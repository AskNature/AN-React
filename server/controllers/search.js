'use strict'
//var db = require('../config/database').db;
//var _ = require('lodash');
var async = require('async');

var Model = require('../models/model2');

var Function = Model('Function', ['name']);

var Strategy = Model('Strategy', ['name', 'summary']);

var GraphSearch = require('./graphsearch.js');

var testSearch = function(req, res, next) {
    Function.getNew('372', function(err, result) {
	res.json(result);
    });
};

var searchWithQuery = function(req, res, next) {
    // graph search with req.params.query
    GraphSearch(req.params.query, function(graphSearchResults) {
	//res.json(graphSearchResults.functions);
	async.map(graphSearchResults.functions, Function.getNew, function(err, results) {
	    if(err) { res.send(err) } else { 
		async.map(results, function(r, callback) {
		    async.map(graphSearchResults.results[r.masterid] ? graphSearchResults.results[r.masterid] : [], Strategy.getNew, function(e, rf) {
			r.children = rf;
			callback(null, r);
		    });
		    //r.children = graphSearchResults.results[r.masterid];
		    //callback(null, r);
		}, function(err, finals) {
		    res.json(finals);
		});
		//res.json(results)
	    }
	});
    });
    // map over functions returned and fetch them
    // map over function array and fetch strategies under them
    // return full structure
};

module.exports = {
    searchWithQuery: searchWithQuery
};
