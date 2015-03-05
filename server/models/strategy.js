// Strategy model

var _ = require('lodash');
var crypto = require('crypto');
var db = require('../config/database').db;

var autoGenerateId = false;

var fields = ['name', 'status', 'summary', 'special_text', 'brief', 'timestamp', 'created_by', 'entered_by', 'date_entered', 'additional_functions', 'keywords', 'common_name', 'scientific_name', 'other_names', 'additional_taxa', 'additional_reference', 'applications_sector', 'applications', 'source', 'source_citation', 'pages_of_excerpt', 'image_file_name', 'video_url', 'pdf_file_name', 'application_1', 'application_2', 'application_3', 'editor_comments'];

var Strategy = function(masterid, attributes, rid) {
    _.forEach(fields, function(field) {
	this[field] = null;
    }, this);
    _.assign(this, attributes);
    this.masterid = masterid;
    
    var _rid = rid;
    this._performSave = function(object, callback) {
	if(!object.name || !object.masterid) {
	    return callback("Object must have a name and masterid", object);
	}
	if(_rid) {
	    // Object already exists, update
	    db.update('Strategy').set(object)
	    .where({'@rid' : _rid}).scalar()
	    .then(function(count) {
		if(count == 1) {
		    callback(null, object);
		} else if(count == 0) {
		    callback("Object not saved. Bad ID?", object);
		} else {
		    callback("Multiple objects saved... This isn't good.", object);
		}
	    }).done();
        } else {
	    // Object doesn't exist, create
	    db.select('count(masterid)').from('Strategy')
	    .where({'masterid': object.masterid})
	    .scalar().then(function(count) {
		if(count > 0) {
		    return callback("An object with that masterid already exists", object);
		}
		db.insert().into('Strategy')
		.set(_.omit(object, ["_performSaved"])).one()
		.then(function(saved) {
		    callback(null, _.omit(saved, ["@type", "@class", "_performSave", "@rid"]));
		});
	    });
        }
    }

    return this;
};

Strategy.prototype.save = function(callback) {
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

Strategy.prototype.set = function(newAttributes) {
    _.assign(this, newAttributes);
    return this;
};

// ------------- static below

Strategy.find = function(constraints, callback) {
    db.select('@rid, masterid, ' + fields.join(', ')).from('Strategy').where(constraints).all().then(function(results) {
	callback(_.map(results, function(result) {
	    return new Strategy(result.masterid, _.pick(result, fields), result.rid);
	}));
    }).done();
};

Strategy.findOne = function(constraints, callback) {
    // find the strategy, create a new wrapper around it
    db.select('@rid, masterid, ' + fields.join(', ')).from('Strategy').where(constraints).limit(1).one().then(function(result) {
	callback(new Strategy(result.masterid, _.pick(result, fields), result.rid));
    }).done();
};

Strategy.get = function(masterid, callback) {
    db.select('@rid, masterid, ' + fields.join(', ')).from('Strategy').where({masterid: masterid}).limit(1).one().then(function(result) {
	if(!result) { return callback(null); }
	callback(new Strategy(result.masterid, _.pick(result, fields), result.rid));
    }).done();
};

Strategy.destroy = function(masterid, callback) {
    db.delete('VERTEX').from('Strategy').where({masterid: masterid}).scalar().then(function(count) {
	if(count == 0) {
	    callback({code: 404, message: "No strategy with that id exists"});
	} else {
	    callback(null);
	}
    });
};

module.exports = Strategy;
