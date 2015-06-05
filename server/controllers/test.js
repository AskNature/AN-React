var db = require('../config/database').db;
var _ = require('lodash');

var Strategy = require('../models/bstrategy');

var SuperStrategy = require('../models/strategy');

var Model = require('../models/model.js');

var Product = Model('InspiredSolutions', ['name', 'headline']);

var Account = require('../models/account.js');

var relationships = {'InspiredSolutions':'in("InspiredBy")'};

var testControllerWith = function(req, res, next) {
    Strategy.getWithRelationships("d1cb32be3c76489375e383e6ed53a736", function(result) {
	res.json(result);
    });
};

var testControllerSave = function(req, res, next) {
    Strategy.getWithRelationships("d1cb32be3c76489375e383e6ed53a736", function(result) {
	result.InspiredBy[0].set({name: 'Anti-fouling coating'}).save(function(err, saved) {
	    if(err) {
		return res.status(500).send(err);
	    } else {
		return res.json(result);
	    }
	});
    });
};

var testController = function(req, res, next) {
    Strategy.get("d1cb32be3c76489375e383e6ed53a736", function(result) {
	res.json(result);
    });
};

var testControllerWithE = function(req, res, next) {
    Strategy.getWithRelationships("d1cb32be3c76489375e383e6ed53a736", function(result) {
        res.json(result.InspiredSolutions);
    });
};

var testControllerSaveRel = function(req, res, next) {
    Strategy.getWithRelationships("d1cb32be3c76489375e383e6ed53a736", function(result) {
	result.set({InspiredSolutions: ["hello"]});
	result.save(function() {});
	res.json(result);
    });
};

var testControllerSaveObj = function(req, res, next) {
    Strategy.getWithRelationships("test2", function(strategy) {
	Product.get("0464f064de539889a819436dd6469330", function(product) {
	    strategy.set({Products: [product]}).save(function(err, saved) {
		res.json(saved);
	    });
	});
    });
};

var testControllerFindOne = function(req, res, next) {
    Strategy.findOne({name: "Test find"}, function(result) {
	if(result) {
	    res.json(result);
	} else {
	    res.status(404).send("Not found");
	}
    });
};

var testControllerFind = function(req, res, next) {
    Strategy.findWithRelationships({name: "Penguin"}, function(result) {
	res.json(result);
    });
};

var testControllerFindQuery = function(req, res, next) {
    var constraints = {name: req.params.query};
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

var TestStrategy = require('../models/teststrategy');

var testModel = function(req, res, next) {
    //res.json(new TestStrategy('hello-world', {name: 'Hello World', description: 'yes', other: 'thing'}, {}));
    TestStrategy.get('001274b75a7dd4f8fc46a5a4a0446489', function(err, result) {
	if(err) { res.send(err) } else { res.json(result); }
    });
};

module.exports = {
    testController: testControllerFind,
    testControllerQuery: testControllerFindQuery,
    testModel: testModel
};
