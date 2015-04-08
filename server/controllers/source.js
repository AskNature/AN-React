'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var sourceCache;

var crypto = require('crypto');

var Source = require('../models/source.js');

if(process.env.NODE_ENV === 'production') {
    sourceCache = new Cached('source', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    sourceCache = new Cached('source');
}
sourceCache.setDefaults({'freshFor': 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The source page has access to the ' + db.name + ' database.');
};

var returnList1 = function(req, res, next) {
  var chain = db
  .select('name, secondary_title, masterid, out("HasStatus").name as status, type, in("HasSource").name as has_source, "source" as entityType, type, timestamp, flag_text, flag_tags, flag_media')
  .from('Source');

  var limit = parseInt(req.query.limit);
  if(limit) {
      chain.limit(limit);
  }

  var offset = parseInt(req.query.offset);
  if(offset) {
      chain.offset(offset);
  }

  var order = req.query.order;
  if(order) {
      chain.order(order.substring(1) + (order.substring(0,1)==='-' ? ' desc' : ' asc'));
  }

  var filter = req.query.filter;
  if(filter) {
      chain.containsText({'name' : filter});
  }

  sourceCache.getOrElse('count', Cached.deferred(function(done) {
      console.log('cache miss');
      db.select('count(*)').from('Source')
      .scalar().then(function(count) {
	  done(null, count); // return Cached.deferred
      }).done();
  })).then(function(count) {
      chain.all().then(function(results) {
	  res.status(200).json({
	      results: results,
	      count: count,
	      maxPages: Math.ceil(count/limit)
	  });
	  console.log('The source controller has sent ' + results.length + ' records.');
      }).done();
  });
};

var returnItem2 = function(req, res, next) {
    var callback = function(item) {
        if(!item) {
            return res.status(404).send("No source with that id exists");
        } else {
            return res.status(200).json(item);
	    }
    };

    if(req.query["expand"]) {
	Source.getWithRelationships(req.params.id, callback);
    } else {
	Source.get(req.params.id, callback);
    }
};

var updateItem2 = function(req, res, next) {
    Source.get(req.params.id, function(item) {
	if(!item) {
	    return res.status(404).send("No source with that id exists");
	} else {
	    item.set(req.body).save(function(err, savedItem) {
		if(err) {
		    return res.status(500).send(err);
		} else {
		    return res.status(200).json(savedItem);
		}
	    });
	}
    });
};

var createItem2 = function(req, res, next) {
    var s = new Source(req.body.masterid, req.body);
    s.save(function(err, saved) {
	if(err) {
	    return res.status(500).send(err);
	} else {
	    return res.status(200).json(saved);
	}
    });
};

var deleteItem2 = function(req, res, next) {
    Source.destroy(req.params.id, function(err) {
	if(err) {
	    return res.status(err.code).send(err.message);
	} else {
	    return res.status(204).send();
	}
    });
};

var deleteMultiple2 = function(req, res, next) { // TODO: use async
    console.log(req.body['delete']);
    if(JSON.parse(req.body['delete']) instanceof Array) {
	JSON.parse(req.body['delete']).forEach(function(item) {
	    Source.destroy(item, function(err) {
		if(err) {
		    return res.status(err.code).send(err.message);
		}
	    });
	});
	res.status(200).send();
    } else {
	return res.status(400).send();
    }
};


    module.exports = {
      loadindex: loadindex,
      returnList1: returnList1,
      returnItem2: returnItem2,
      updateItem2: updateItem2,
      createItem2: createItem2,
      deleteItem2: deleteItem2,
      deleteMultiple2: deleteMultiple2
    };
