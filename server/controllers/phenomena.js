'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var phenomenaCache;

if(process.env.NODE_ENV === 'production') {
    phenomenaCache = new Cached('phenomena', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    phenomenaCache = new Cached('phenomena');
}
phenomenaCache.setDefaults({'freshFor': 120});

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
  .select('name, short_name, in("ChildOf").name as child_items, out("ChildOf").name as parent, out("ChildOf").masterid as parentid, in("HasFunction").size() as outcome_count, masterid, "phenomenon" as entityType')
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

  var filter = req.query.filter;
  if(filter) {
      chain.containsText({'name' : filter});
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

    module.exports = {
      loadindex: loadindex,
      returnList: returnList,
      returnItem: returnItem
    };
