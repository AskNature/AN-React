'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var livingSystemCache;

if(process.env.NODE_ENV === 'production') {
    livingSystemCache = new Cached('livingSystem', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    livingSystemCache = new Cached('livingSystem');
}
livingSystemCache.setDefaults({'freshFor': 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var returnList = function(req, res) {
  var chain = db
  .select('name, masterid, taxon, in("HasLivingSystem").name as has_living_system, common_name, "living-system" as entityType')
  .from('LivingSystem')
  .where('in_HasLivingSystem IS NOT NULL');

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

  livingSystemCache.getOrElse('count', Cached.deferred(function(done) {
      db.select('count(*)').from('LivingSystem')
      .where('in_HasLivingSystem IS NOT NULL')
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
	  console.log('The living system API has sent ' + results.length + ' records.');
      }).done();
  });
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, masterid, gbif_id, other_names, taxon, parent_id, in("HasLivingSystem").name as has_living_system, in("ChildSystemOf").name as children, out("ChildSystemOf").name as parent')
  .from('LivingSystem')
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
