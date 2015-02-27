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
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
      console.log('The strategy controller has sent ' + results.length + ' records.');
  })
  .done();
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
      returnItem: returnItem
    };
