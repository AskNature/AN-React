'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');


var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The strategy page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res, next) {
  db
  .select('name, summary as description, out("HasLivingSystem").name as living_system, out("HasFunction").name as outcomes, masterid')
  .from('Strategy')
  .where({status: 0})
  .limit(parseInt(req.query["limit"]))
  .offset(parseInt(req.query["offset"]))
  .order((req.query["order"] ? req.query["order"] : "").substring(1) + (((req.query["order"] ? req.query["order"] : "").substring(0, 1) == "-") ? " desc" : " asc"))
  .all()
  .then(function (results) {
      db.select('count(*)').from('Strategy').where({status: 0}).scalar().then(function(count) {
	  res.status(200).json({
              results: results,
	      count: count,
	      maxPages: Math.ceil(count/parseInt(req.query["limit"]))
	  });
	  console.log('The strategy controller has sent ' + results.length + ' records.');
      }).done();
  })
  .done();
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, summary as description, special_text, brief, masterid, in("Created").name as created_by, out("HasLivingSystem").name as living_system, out("HasFunction").name as outcomes, out("HasMechanism").description as mechanisms, out("HasConditions").description as conditions, out("HasMedia").filename as media, in("InspiredBy").name as products, out("FeaturedIn").name as sources, in("StudiedBy").name as experts, in("Bookmarked").name as collectors, timestamp, entered_by, date_entered, additional_functions, keywords, common_name, other_names, additional_taxa, applications_sector, applications, source_citation, pages_of_excerpt, source, pdf_file_name, image_file_name, additional_reference, video_url, general_strategy, editor_comments, scientific_name, application_1, application_2, application_3, status')
  .from('Strategy')
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
