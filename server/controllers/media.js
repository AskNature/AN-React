/**
* Outcome Controller - receives actions via the router
* and interacts with the database
*/

'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var Cached = require('cached');

var mediaCache;
if(process.env.NODE_ENV == 'production') {
    mediaCache = Cached('media', { backend: {
        type: 'memcached',
        hosts: '127.0.01:11211'
    }});
} else {
    mediaCache = Cached('media');
}
mediaCache.setDefaults({"freshFor": 120});

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
  .select('name, masterid, filename, id, entity, "media" as entityType')
  .from('Media');

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

  mediaCache.getOrElse('count', Cached.deferred(function(done) {
      db.select('count(*)').from('Media')
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
	  console.log('The media API has sent ' + results.length + ' records.');
      }).done();
  });
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('id, user_id, entity, masterid, mime_type, file_type_id, filename, author, author_url, source, source_url, license_id, description, deleted, timestamp, name, keywords, featured, popup, sort_order, in("AddedMedia").name as added_media, in("HasMedia").name as has_media')
  .from('Media')
  .where('id LIKE "' + req.params.id + '"')
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
