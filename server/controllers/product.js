'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var crypto = require('crypto');

var Cached = require('cached');

var productCache;
if(process.env.NODE_ENV == 'production') {
    productCache = Cached('product', { backend: {
	type: 'memcached',
	hosts: '127.0.01:11211'
    }});
} else {
    productCache = Cached('product');
}
productCache.setDefaults({"freshFor": 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The product page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res) {
  var chain = db
  .select('name, headline as description, out("InspiredBy").name as inspiredby, out("HasFunction").description as outcomes, masterid, "product" as entityType')
  .from('InspiredSolutions')
  .where({status: 0});

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

  productCache.getOrElse('count', Cached.deferred(function(done) {
      db.select('count(*)').from('InspiredSolutions')
      .where({status: 0})
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
	  console.log('The product API has sent ' + results.length + ' records.');
      }).done();
  });
};

var createProduct = function(req, res, next) {
    // TODO: permissions check
    var createWithToken = function() {
	crypto.randomBytes(16, function(err, buf) {
	    if(err) { return res.status(500).send(); }
	    var masterid = buf.toString('hex');
	    db.select('count(*)').from('InspiredSolutions')
	    .where({masterid: masterid}).scalar().then(function(count) {
		if(count > 0) {
		    return createWithToken();
		} else {
		    db.insert().into('InspiredSolutions')
		    .set({masterid: masterid, name: 'New inspired solution', status: 'raw'}) // TODO: Proper template
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
  .select('name, headline as description, out("InspiredBy").name as inspiredby, out("InspiredBy").masterid as inspiredby_id, out("HasDesignedSystem").name as designedsystems, out("HasFunction").description as outcomes, out("HasFunction").masterid as outcomes_id, out("HasMechanism").description as mechanisms, out("HasConditions").description as conditions, special_text, challenges_solved, how_is_it_different, biomimicry_story, product_type, patent_name, availability, company, phase, patent_number, company_website, strategy, consumer_products, keywords, in("Bookmarked").name as collectors, out("HasMedia").filename as media, out("HasMedia").name as media_name, out("HasMedia").entity as media_entity, out("HasMedia").masterid as media_id, out("FeaturedIn").name as sources, out("StudiedBy").name as researchers, status, timestamp, revision, masterid')
  .from('InspiredSolutions')
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
