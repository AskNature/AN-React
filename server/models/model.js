// Generic model

var _ = require('lodash');
var crypto = require('crypto');
var db = require('../config/database').db;

var autoGenerateId = false;

var ConstructModel = function(entityName, fields) {

    var Model = function(masterid, attributes, rid) {
	_.forEach(fields, function(field) {
	    this[field] = null;
	}, this);
	_.assign(this, attributes);
	this.masterid = masterid;
    
	var _rid = rid;
	this._performSave = function(object, callback) {
	    if(!object.name || !object.masterid) {
		return callback("Item must have a name and masterid", object);
	    }
	    if(_rid) {
		// Item already exists, update
		db.update(entityName).set(object)
		    .where({'@rid' : _rid}).scalar()
		    .then(function(count) {
			if(count == 1) {
			    callback(null, object);
			} else if(count == 0) {
			    callback("Item not saved. Bad ID?", object);
			} else {
			    callback("Multiple items saved... This isn't good.", object);
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
			    .set(_.omit(object, ["_performSaved"])).one()
			    .then(function(saved) {
				callback(null, _.omit(saved, ["@type", "@class", "_performSave", "@rid", "save", "set"]));
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
	_.assign(this, newAttributes);
	return this;
    };
    
    // ------------- static below
    
    Model.find = function(constraints, callback) {
	db.select('@rid, masterid, ' + fields.join(', ')).from(entityName).where(constraints).all().then(function(results) {
	    callback(_.map(results, function(result) {
		return new Model(result.masterid, _.pick(result, fields), result.rid);
	    }));
	}).done();
    };
    
    Model.findOne = function(constraints, callback) {
	// find the item, create a new wrapper around it
	db.select('@rid, masterid, ' + fields.join(', ')).from(entityName).where(constraints).limit(1).one().then(function(result) {
	    callback(new Model(result.masterid, _.pick(result, fields), result.rid));
	}).done();
    };
    
    Model.get = function(masterid, callback) {
	db.select('@rid, masterid, ' + fields.join(', ')).from(entityName).where({masterid: masterid}).limit(1).one().then(function(result) {
	    if(!result) { return callback(null); }
	    callback(new Model(result.masterid, _.pick(result, fields), result.rid));
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
    
