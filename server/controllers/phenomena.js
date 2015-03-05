/**
* Outcome Controller - receives actions via the router
* and interacts with the database
*/

'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var crypto = require('crypto');

var Cached = require('cached');

var Phenomenon = require('../models/phenomenon.js');

var phenomenaCache;
if(process.env.NODE_ENV == 'production') {
    phenomenaCache = Cached('phenomena', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    phenomenaCache = Cached('strategy');
}
phenomenaCache.setDefaults({"freshFor": 120});

/**
* I'm still not sure if this var is necessary to include in this file.
*/

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The phenomena page has access to the ' + db.name + ' database.');
};

/** Return a list of functions, along with the names of each function's children and parent.*/

var returnList = function(req, res) {
  var chain = db
  .select('name, short_name, in("ChildOf").name as children, out("ChildOf").name as parent, out("ChildOf").masterid as parentid, masterid, "phenomenon" as entityType')
  .from('Function');

  var limit = parseInt(req.query["limit"]);
  if(limit) {
      chain.limit(limit);
  }

  var offset = parseInt(req.query["offset"]);
  if(offset) {
      chain.offset(offset);
  }

  var order = req.query["order"];
  if(order) {
      chain.order(order.substring(1) + (order.substring(0,1)=="-" ? "desc" : "asc"));
  }

  phenomenaCache.getOrElse('count', Cached.deferred(function(done) {
      console.log("cache miss");
      db.select('count(*)').from('Function')
      .scalar().then(function(count) {
	  done(null, count); // return Cached.deferred
      }).done();
  })).then(function(count) {
      chain.all().then(function (results) {
	  res.status(200).json({
	      results: results,
	      count: count,
	      maxPages: Math.ceil(count/limit)
	  });
	  console.log('The phenomena API has sent ' + results.length + ' records.');
      }).done();
  });
};

var createItem = function(req, res, next) {
    // TODO: permissions check
    var createWithToken = function() {
	crypto.randomBytes(16, function(err, buf) {
	    if(err) { return res.status(500).send(); }
	    var masterif = buf.toString('hex');
	    db.select('count(*)').from('Function')
	    .where({masterid: masterid}).scalar()
	    .then(function(count) {
		if(count > 0) {
		    return createWithToken();
		} else {
		    db.insert().into('Function')
		    .set({masterid: masterid, name: 'New phenomenon'}) // TODO: Proper template
		    .all().then(function(results) {
			return res.status(200).json({
			    results: results
			});
		    });
		}
	    });
	});
    };
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, short_name, description, in("ChildOf").name as children, in("ChildOf").masterid as children_id, out("ChildOf").name as parent, out("ChildOf").out("ChildOf").name as groupname, out("ChildOf").out("ChildOf").masterid as groupid, out("ChildOf").masterid as parentid, in("HasFunction").name as has_function, masterid, out("HasMedia").filename as media, out("HasMedia").name as media_name, out("HasMedia").entity as media_entity, out("HasMedia").masterid as media_id')
  .from('Function')
  .where('masterid == "' + req.params.id + '"')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
  })
  .done();
};

var returnItem2 = function(req, res, next) {
    Phenomenon.get(req.params.id, function(item) {
	if(!item) {
	    return res.status(404).send("No phenomenon with that id exists");
	} else {
	    return res.status(200).json(item);
	}
    });
};

var updateItem2 = function(req, res, next) {
    Phenomenon.get(req.params.id, function(item) {
	if(!item) {
	    return res.status(404).send("No product with that id exists");
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
    var p = new Phenomenon(req.body.masterid, req.body);
    p.save(function(err, saved) {
	if(err) {
	    return res.status(500).send(err);
	} else {
	    return res.status(200).json(saved);
	}
    });
};

var deleteItem2 = function(req, res, next) {
    Phenomenon.destroy(req.params.id, function(err) {
	if(err) {
	    return res.status(err.code).send(err.message);
	} else {
	    return res.status(204).send();
	}
    });
};

    module.exports = {
      loadindex: loadindex,
      returnList: returnList,
      returnItem: returnItem,
      returnItem2: returnItem2,
      updateItem2: updateItem2,
      createItem2: createItem2,
      deleteItem2: deleteItem2
    };
