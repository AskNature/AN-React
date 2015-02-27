'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var strategyCache;

if(process.env.NODE_ENV == 'production') {
    strategyCache = Cached('strategy', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    strategyCache = Cached('strategy');
}
strategyCache.setDefaults({"freshFor": 120});

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The strategy page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res, next) {
  var chain = db
  .select('name, summary as description, out("HasLivingSystem").name as living_system, out("HasFunction").name as outcomes, masterid, "strategy" as entityType')
  .from('Strategy')
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
      chain.order(order.substring(1) + (order.substring(0,1)=="-" ? " desc" : " asc"));
  }

  var filter = req.query["filter"];
  if(filter) {
      chain.containsText({"name" : filter});
  }

  strategyCache.getOrElse('count', Cached.deferred(function(done) {
      console.log("cache miss");
      db.select('count(*)').from('Strategy')
      .where({status: 0})
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
	  console.log('The strategy controller has sent ' + results.length + ' records.');
      }).done();
  });
};

var updateStrategy = function(req, res, next) {
    var newData = {summary: req.body.description, name: req.body.name, special_text: req.body.special_text, brief: req.body.brief, common_name: req.body.common_name, other_names: req.body.other_names, applications: req.body.applications, application_1: req.body.application_1, application_2: req.body.application_2, application_3: req.body.application_3, scientific_name: req.body.scientific_name, editor_comments: req.body.editor_comments};
    console.log(JSON.stringify(newData));
    db.update('Strategy').set(newData)
        .where({masterid:req.body.masterid}).scalar().then(function(count) {
            console.log("strategy updated: " + count);
	    res.status(200).send(req.body);
        });
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, summary as description, special_text, brief, masterid, in("Created").name as created_by, out("HasLivingSystem").name as living_system, out("HasLivingSystem").taxon as living_system_taxon, out("HasLivingSystem").masterid as living_system_id, out("HasFunction").name as outcomes, out("HasFunction").masterid as outcomes_id, out("HasMechanism").description as mechanisms, out("HasConditions").description as conditions, out("HasMedia").filename as media, out("HasMedia").name as media_name, out("HasMedia").entity as media_entity, out("HasMedia").masterid as media_id, in("InspiredBy").name as products, in("InspiredBy").masterid as product_masterid, out("FeaturedIn").name as sources, out("FeaturedIn").authors as sources_authors, out("FeaturedIn").publication_year as sources_year, out("FeaturedIn").masterid as sources_id, in("StudiedBy").name as experts, in("Bookmarked").name as collectors, timestamp, entered_by, date_entered, additional_functions, keywords, common_name, other_names, additional_taxa, applications_sector, applications, source_citation, pages_of_excerpt, source, pdf_file_name, image_file_name, additional_reference, video_url, general_strategy, editor_comments, scientific_name, application_1, application_2, application_3, status')
  .from('Strategy')
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
      returnItem: returnItem,
      updateStrategy: updateStrategy
    };
