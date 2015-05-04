var _ = require('lodash');

var Strategy = require('../models/bstrategy');

var Model = require('../models/model.js');

var Product = Model('InspiredSolutions', ['name', 'headline']);

var Account = require('../models/account.js');

var relationships = {'InspiredSolutions':'in("InspiredBy")'};

var searchQuery = function(req, res, next) {
    var constraints = {name: req.params.query};
    var type = req.params.type;
    if(type === 'b.strategy') {
	
    } else if (type === 'd.strategy') {

    }
    if(req.user) {
	Account.getWithRelationships(req.user.masterid, function(u) {
	    if(u) { 
		if(u.status.masterid === 'demo') {
		    constraints.flag_demo = true;
		}
	    }
            Strategy.findWithRelationships(constraints, function(result) {
		res.json(result);
	    });
	});
    } else {
	Strategy.findWithRelationships(constraints, function(result) {
            res.json(result);
        });
    }
};

module.exports = {
    searchQuery: searchQuery
};
