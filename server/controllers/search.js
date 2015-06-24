'use strict'
//var db = require('../config/database').db;
//var _ = require('lodash');
var async = require('async');

var Model = require('../models/model2');

var GraphSearch = require('./graphsearch.js');

var testSearch = function(req, res, next) {
    Function.getNew('372', function(err, result) {
	res.json(result);
    });
};

var classEdgeMap = {
    'Strategy': {
	'fields': ['name', 'summary'],
	'Function': { // strategy grouped by function
	    diffuseSearchEdge: 'in("HasFunction")',
	    diffuseTraverseEdge: 'in("ChildOf")',
	    groupEdge: 'out("HasFunction")',
	    fields: ['name']
	},
	'Collection': {
	    diffuseSearchEdge: 'in("InCollection")',
	    diffuseTraverseEdge: 'in("ChildOf")',
	    groupEdge: 'out("InCollection")',
	    fields: ['name']
	}
    }
};

var searchWithQuery = function(req, res, next) {
    // graph search with req.params.query
    var searchClass= req.params.searchClass;
    var searchModel= Model(searchClass, classEdgeMap[searchClass].fields);
    var diffuseClass = req.params.groupClass;
    var diffuseSearchEdge = classEdgeMap[searchClass][diffuseClass].diffuseSearchEdge;
    var diffuseTraverseEdge = classEdgeMap[searchClass][diffuseClass].diffuseTraverseEdge;
    var groupClass = diffuseClass;
    var groupModel = Model(groupClass, classEdgeMap[searchClass][diffuseClass].fields); 
    var groupEdge = classEdgeMap[searchClass][diffuseClass].groupEdge;
    GraphSearch(req.params.query, searchClass, {class: diffuseClass, edge: diffuseSearchEdge, traverse: diffuseTraverseEdge}, groupEdge, function(graphSearchResults) {
	//res.json(graphSearchResults.functions);
	async.map(graphSearchResults.groupings, groupModel.getNew, function(err, results) {
	    if(err) { res.send(err) } else { 
		async.map(results, function(r, callback) {
		    async.map(graphSearchResults.results[r.masterid] ? graphSearchResults.results[r.masterid] : [], searchModel.getNew, function(e, rf) {
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
