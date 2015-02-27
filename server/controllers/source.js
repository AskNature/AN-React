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
  .select('name, masterid, status, type, in("FeaturedIn").size() as featured_count')
  .from('Sources')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
      console.log('The collection controller has sent ' + results.length + ' records.');
  })
  .done();
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('name, masterid, status, timestamp, type, secondary_title, authors, author_address, pages, volume, number, publication_year, publisher, isbn, accession_number, url, notes, access_date, keywords, abstract_excerpt, published_language, type_of_work, other_information, in("FeaturedIn").name as featured_in, in("Bookmarked").name as collected')
  .from('Sources')
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
