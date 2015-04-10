var db = require('../config/database').db;
var _ = require('lodash');

var Strategy = require('../models/bstrategy');

var Model = require('../models/model.js');

var Product = Model('InspiredSolutions', ['name', 'headline']);

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
    Strategy.findWithRelationships({name: req.params.query}, function(result) {
        res.json(result);
    });
};

module.exports = {
    testController: testControllerFind,
    testControllerQuery: testControllerFindQuery
};
