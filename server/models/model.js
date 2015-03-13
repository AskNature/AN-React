// Generic model

var _ = require('lodash');
var crypto = require('crypto');
var async = require('async');
var db = require('../config/database').db;

var autoGenerateId = false;

var ConstructModel = function(entityName, fields, relationships) {

    var Model = function(masterid, attributes, rid) {
	_.forEach(fields, function(field) {
	    this[field] = null;
	}, this);
	_.assign(this, _.pick(attributes, fields));
	this.masterid = masterid;

	_.forEach(relationships, function(val, key) {
	    // build a model for each relationship
	    var relModel = val.model;
	    if(attributes[key]) {
		var arr;
                if(_.isArray(attributes[key])) {
                    arr = attributes[key];
                } else {
                    try {
                        arr = JSON.parse(attributes[key]);
                        if(!_.isArray(arr)) {
                            return false;
                        }
                    } catch(e) {
                        return false;
                    }
                }
		this[key] = _.map(arr, function(rel) { // attributes[key]
		    if(_.isObject(rel)) {
			return new relModel(rel.masterid, rel, rel['@rid']);
		    } else {
			return rel;
		    }
		});
	    }
	}, this);
    
	var _rid = rid;

	var _updateRelationships = function(object, updateFinishedCallback) {
	    console.log("updating relationships");
	    async.each(Object.keys(relationships), function(rel, relationshipCallback) {
		if(_.has(object, rel)) {
		    console.log("need to update " + rel);
		    db.select(relationships[rel].edge + ".masterid as edges")
		    // db.select('set(' + relationships[rel].edge + ".masterid) as edges") // deduplicate
		    .from(entityName).where({'@rid' : _rid}).limit(1).one().then(function(result) {
			var requestEdges = _.map(object[rel], function(val) {
			    if(_.isObject(val)) {
				return val.masterid;
			    } else if(_.isString(val)) {
				return val;
			    } else if(_.isNumber(val)) {
				return val;
			    } else {
				relationshipCallback("Something broke");
			    }
			});
			var dbEdges = result ? result.edges : [];
			console.log("edges in db: " + dbEdges);
			console.log("edges in request: " + requestEdges);
			var edgesToAdd = _.difference(requestEdges, dbEdges);
			var edgesToRemove = _.difference(dbEdges, requestEdges);
			console.log("added: " + edgesToAdd);
			console.log("removed: " + edgesToRemove);
			var edgeFlip = relationships[rel].edge.substring(0,2) == "in";
			var edgeName = relationships[rel].edge.substring(edgeFlip ? 4 : 5, relationships[rel].edge.length - 2)

			async.each(edgesToRemove, function(edgeToRemove, edgeCallback) {
			    var them = '(SELECT * FROM ' + relationships[rel].className + ' WHERE masterid = "' + edgeToRemove + '")';
			    db.query('DELETE EDGE ' + edgeName + ' FROM ' + (edgeFlip ? them : _rid) + ' TO ' + (edgeFlip ? _rid : them)).then(function(res) {
				if(res != '') {
				    console.log("delete worked");
				    edgeCallback();
				} else {
                                    edgeCallback("target doesn't exist");
                                }
			    });
			}, function(err) {
			    if(err) {
				relationshipCallback("Error removing an edge");
			    } else {
				async.each(edgesToAdd, function(edgeToAdd, edgeCallback) {
				    // do the adding
				    console.log("adding " + edgeToAdd + " as " + edgeName + " reverse " + edgeFlip);
				    var them = '(SELECT * FROM ' + relationships[rel].className + ' WHERE masterid = "' + edgeToAdd + '")';
				    db.query('CREATE EDGE ' + edgeName + ' FROM ' + (edgeFlip ? them : _rid) + ' TO ' + (edgeFlip ? _rid : them)).then(function(res) {
					if(res != '') {
					    console.log("add worked");
					    edgeCallback();
					} else {
					    edgeCallback("target doesn't exist");
					}
				    });
				}, function(err) {
				    if(err) {
					relationshipCallback("Error adding an edge: " + err);
				    } else {
					relationshipCallback();
				    }
				});
			    }
			});
		    });
		} else {
		    relationshipCallback();
		}
	    }, function(err) {
		updateFinishedCallback(err, object);
	    });
	};

	this._performSave = function(object, callback) { // TODO: fix null passed callbacks
	    if(!object.name || !object.masterid) {
		return callback("Item must have a name and masterid", object);
	    }

	    if(_rid) {
		// Item already exists, update
		// TODO: allow masterid update?

		db.update(entityName).set(_.pick(object, fields))
		    .where({'@rid' : _rid}).scalar()
		    .then(function(count) {
			if(callback) {
			    if(count == 1) {
				//callback(null, object);
				_updateRelationships(object, callback);
			    } else if(count == 0) {
				callback("Item not saved. Bad ID?", object);
			    } else {
				callback("Multiple items saved... This isn't good.", object);
			    }
			}
		    }).done();
            } else {
		// Item doesn't exist, create
		db.select('count(masterid)').from(entityName)
		    .where({'masterid': object.masterid})
		    .scalar().then(function(count) {
			if(count > 0) {
			    return callback("A " + entityName + " with that masterid already exists", object);
			}
			db.insert().into(entityName)
			    .set(_.omit(object, ["_performSave", "save", "set"])).one()
			    .then(function(saved) {
				//callback(null, _.omit(saved, ["@type", "@class", "@rid"]));
				_rid = saved['@rid'];
				_updateRelationships(_.omit(saved, ["@type", "@class", "@rid"]), callback);
			    });
		    });
            }
	}
	
	return this;
    };
    
    Model.prototype.save = function(callback) {
	if(!this.masterid && autoGenerateId) {
	    var that = this;
	    crypto.randomBytes(16, function(err, buf) {
		if(err) { return res.status(500).send(); }
		that.masterid = buf.toString('hex');
		that._performSave(that, callback)
	    });
	} else {
	    this._performSave(this, callback);
	}
    };
    
    Model.prototype.set = function(newAttributes) {
	_.forEach(relationships, function(val, key) {
	    if(_.has(newAttributes, key)) {
		var arr;
		if(_.isArray(newAttributes[key])) {
		    arr = newAttributes[key];
		} else {
		    try {
			arr = JSON.parse(newAttributes[key]);
			if(!_.isArray(arr)) {
			    return false;
			}
		    } catch(e) {
			return false;
		    }
		}
		this[key] = arr;
	    }
	}, this);
	_.assign(this, _.pick(newAttributes, fields));
	return this;
    };
    
    // ------------- static below
    
    Model.find = function(constraints, callback, options) {
	var relFields = _.map(relationships, function(val, key) {
            //return 'set(' + val.edge + '.masterid) as ' + key; // should deduplicate
            return val.edge + '.masterid as ' + key;
        });
	db.select('@rid, masterid, ' + fields.join(', ') + (relFields.length ? ', ' : '') + relFields.join(', ')).from(entityName).where(constraints).all().then(function(results) {
	    callback(_.map(results, function(result) {
		return new Model(result.masterid, result, result.rid);
	    }));
	}).done();
    };

    Model.findWithRelationships = function(constraints, callback, options) {
        var relFields = _.map(relationships, function(val, key) {
            //return 'set(' + val.edge + '.masterid) as ' + key; // should deduplicate
            return val.edge + ' as ' + key;
        });
        var fetchMap = _.mapValues(relationships, function() { return 0 });
        db.select('@rid, masterid, ' + fields.join(', ') + (relFields.length ? ', ' : '') + relFields.join(', ')).from(entityName).where(constraints).fetch(fetchMap).all().then(function(results) {
            callback(_.map(results, function(result) {
                return new Model(result.masterid, result, result.rid);
            }));
        }).done();
    };


    Model.findAutocomplete = function(typed, limit, callback) {
	db.query('SELECT @rid, masterid, ' + fields.join(', ') + " FROM " + entityName + " WHERE name LIKE '" + typed + "%' LIMIT " + limit).then(function(results) {
	    callback(results);
	}).done();
    };
    
    Model.findOne = function(constraints, callback) {
	var relFields = _.map(relationships, function(val, key) {
	    //return 'set(' + val.edge + '.masterid) as ' + key; // should deduplicate
            return val.edge + '.masterid as ' + key;
        });
	// find the item, create a new wrapper around it
	db.select('@rid, masterid, ' + fields.join(', ') + (relFields.length ? ', ' : '') + relFields.join(', ')).from(entityName).where(constraints).limit(1).one().then(function(result) {
	    if(!result) { return callback(null); }
	    callback(new Model(result.masterid, result, result.rid));
	}).done();
    };
    
    Model.get = function(masterid, callback) {
	var relFields = _.map(relationships, function(val, key) {
	    //return 'set(' + val.edge + '.masterid) as ' + key; // should deduplicate
            return val.edge + '.masterid as ' + key;
	});
	db.select('@rid, masterid, ' + fields.join(', ') + (relFields.length ? ', ' : '') + relFields.join(', ')).from(entityName).where({masterid: masterid}).limit(1).one().then(function(result) {
	    if(!result) { return callback(null); }
	    callback(new Model(result.masterid, result, result.rid));
	}).done();
    };

    Model.getWithRelationships = function(masterid, callback) {
	var relFields = _.map(relationships, function(val, key) {
	    //return 'set(' + val.edge + ') as ' + key; // should deduplicate
	    return val.edge + ' as ' + key;
	});
	var fetchMap = _.mapValues(relationships, function() { return 0 });
	db.select('@rid, masterid, ' + fields.join(', ') + (relFields.length ? ', ' : '') + relFields.join(', ')).from(entityName).where({masterid: masterid}).fetch(fetchMap).limit(1).one().then(function(result) {
	    if(result) {
		console.log("deep-fetch success");
		var m = new Model(result.masterid, result, result.rid);
		callback(m);
	    } else {
		console.log("error deep-fetching");
		callback(null);
	    }
	}).done();
    };
    
    Model.destroy = function(masterid, callback) {
	db.delete('VERTEX').from(entityName).where({masterid: masterid}).scalar().then(function(count) {
	    if(count == 0) {
		callback({code: 404, message: "No " + entityName + " with that id exists"});
	    } else {
		callback(null);
	    }
	});
    };

    return Model;
};

module.exports = ConstructModel;
    
