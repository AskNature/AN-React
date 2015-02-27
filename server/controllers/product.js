'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The product page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res) {
  db
  .select('name, headline as description, out("InspiredBy").name as inspiredby, out("HasFunction").description as outcomes, masterid')
  .from('InspiredSolutions')
  .where({status: 0})
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
      console.log('The product controller has sent ' + results.length + ' records.');
  })
  .done();
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
