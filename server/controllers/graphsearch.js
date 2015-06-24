'use strict'
//var dbsetup = require('./config/database');
var db = require('../config/database').db;
var _ = require('lodash');
var async = require('async');

//dbsetup.config();

//var db = dbsetup.db;

//var query = 'store energy';
//var query = 'change colors';
//var query = 'penguin';
//var query = 'owl';
//var query = 'assemble';
//var query = 'cool';
//var query = 'buoyancy';
//var query = 'change buoyancy';
//var query = 'float';

// searchClass = 'Strategy'
// searchRel = {class: 'Function', edge:'in("HasFunction")', traverse:'in("ChildOf")'}
// groupEdge = out("HasFunction")

var start = new Date().getTime();
var GraphSearch = function(query, searchClass, searchRel, groupEdge, maincb) {
    db.query('select masterid, $score as score from '+searchRel.class+' where name LUCENE "'+query+'"').all().then(function(results) {
	/*_.each(results, function(r) {
	  console.log(r.masterid + ': ' + r.score);
	  });*/
	var funcMap = {};
	var vMap = {};
	async.each(results, function(r, callback) {
	    //console.log(r.masterid + ': ' + r.score);
	    r.masterid in funcMap ? funcMap[r.masterid] += r.score : funcMap[r.masterid] = r.score;
	    db.query('select $depth as depth, masterid from (traverse '+searchRel.traverse+' from (select from '+searchRel.class+' where masterid = '+ r.masterid +')) where $depth > 0').all().then(function(rresults) {
		async.each(rresults, function(rr, cb) {
		    rr.masterid in funcMap ? funcMap[rr.masterid] += r.score/rr.depth : funcMap[rr.masterid] = r.score;
		    cb(null);
		}, function(err) {
		    callback(null);
		});
	    });
	}, function(err) {
	    if(err) {
		console.log('error');
	    } else {
		//console.log(myMap);
		async.each(Object.keys(funcMap), function(func, callback) {
		    db.query('select '+searchRel.edge+'.masterid as verts from '+searchRel.class+' where masterid = "' + func + '"').all().then(function(vertices) {
			console.log(func + ': ' + JSON.stringify(vertices[0].verts.length));
			async.each(vertices[0].verts, function(v, cb) {
			    v in vMap ? vMap[v] += funcMap[func] : vMap[v] = funcMap[func];
			    cb(null);
			}, function(err2) {
			    callback(err2);
			});
		    });
		}, function(err2) {
		    // this does the real work
		    console.log('real work done');
		    console.log(vMap);
		    db.query('select masterid, $score as score from '+searchClass+' where [name,summary] lucene "'+query+'"').all().then(function(strats) {
			console.log(strats);
			var funcTree = {};
			async.each(strats, function(s, callback) {
			    s.masterid in vMap ? vMap[s.masterid] += s.score : vMap[s.masterid] = s.score;
			    callback(null);
			}, function(err3) {
			    var sortable = [];
			    for(var i in vMap) {
				sortable.push([i, vMap[i]]);
			    }
			    var sorted = sortable.sort(function(a,b) { return b[1] - a[1]; });
			    console.log(sorted);
			    console.log(funcMap);
			    async.each(sorted, function(str, callback) {
				console.log(str[0]);
				db.query('select '+groupEdge+'.masterid as masterid from '+searchClass+' where masterid = "' + str[0] + '"').all().then(function(funs) {
				    if(!funs[0]) return callback("not work");
				    async.each(funs[0].masterid, function(f, cb) {
					f in funcMap ? funcMap[f] += str[1] : funcMap[f] = str[1];
					f in funcTree ? funcTree[f].push(str[0]) : funcTree[f] = [str[0]];
					cb(null);
				    }, function(err5) {
					callback(err5);
				    });
				});
			    }, function(err4) {
				console.log(funcMap);
				console.log(funcTree);
				var sortFunc = [];
				for(var i in funcMap) {
				    console.log(i);
				    sortFunc.push([i, funcMap[i]]);
				}
				var sortedFunc = sortFunc.sort(function(a,b) { return b[1] - a[1]; });
				console.log(_.map(sortedFunc, function(r) { return r[0] }));
				var end = new Date().getTime();
				var time = end - start;
				console.log('Time: ' + time);
				maincb({groupings: _.map(sortedFunc, function(r) { return r[0] }), results: funcTree});
			    });
			});
		    });
		});
	    }
	});
    });
};

module.exports = GraphSearch;
