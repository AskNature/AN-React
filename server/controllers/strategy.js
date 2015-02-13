/**
* Outcome Controller - receives actions via the router
* and interacts with the database
*/

'use strict';
var db = require('../config/database').db;
var Oriento = require('oriento'),

// I'm positive there's a cleaner and more efficient way to connect to the db:
//config = require('../config/secrets.json'),
//oriento = Oriento(config.server),
//db = oriento.use(config.database),

settings = require('../config/env/default'),
path = require('path');

/**
* I'm still not sure if this var is necessary to include in this file.
*/

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The strategy page has access to the ' + db.name + ' database.');
};

/** Return a list of functions, along with the names of each function's children and parent.*/

var returnList = function(req, res, next) {
  db
  .select('name, summary as description, out("HasLivingSystem").name as living_system, out("HasFunction").description as function, masterid')
  .from('Strategy')
  .where({status: 0})
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
      console.log('The strategy controller has sent ' + results.length + ' records.');
      // console.log(results);
  })
  .done();
}

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, summary, special_text, brief, masterid, out("HasLivingSystem").name as living_system, out("HasFunction").description as functions, out("HasMedia").filename as media, in("InspiredBy").name as products, out("FeaturedIn").name as sources, in("StudiedBy").name as experts, in("Bookmarked").name as collectors, timestamp, entered_by, date_entered, additional_functions, keywords, common_name, other_names, additional_taxa, applications_sector, applications, source_citation, pages_of_excerpt, source, pdf_file_name, image_file_name, additional_reference, video_url, general_strategy, editor_comments, scientific_name, application_1, application_2, application_3, status')
  .from('Strategy')
  .where('masterid LIKE "' + req.params.id + '"')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
  })
  .done();
}


    module.exports = {
      loadindex: loadindex,
      returnList: returnList,
      returnItem: returnItem
    };
