'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var Cached = require('cached');

var collectionCache;
if(process.env.NODE_ENV == 'production') {
    collectionCache = Cached('collection', { backend: {
        type: 'memcached',
        hosts: '127.0.01:11211'
    }});
} else {
    collectionCache = Cached('collection');
}
collectionCache.setDefaults({"freshFor": 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The product page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res) {
  var chain = db
  .select('name, masterid, "collection" as entityType')
  .from('Collection');

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

  collectionCache.getOrElse('count', Cached.deferred(function(done) {
      db.select('count(*)').from('Collection')
      .scalar().then(function(count) {
	  done(null, count);
      }).done();
  })).then(function(count) {
      chain.all().then(function (results) {
	  res.status(200).json({
              results: results,
	      count: count,
	      maxPages: Math.ceil(count/limit)
	  });
	  console.log('The collection API has sent ' + results.length + ' records.');
      }).done();
  });
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, masterid')
  .from('Collection')
  .where('masterid LIKE "' + req.params.id + '"')
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
