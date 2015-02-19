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
  .select('name, headline as description, out("InspiredBy").name as inspiredby, out("HasFunction").description as functions, masterid')
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
  .select('name, headline as description, out("InspiredBy").name as inspiredby, out("HasFunction").description as functions, masterid')
  .from('InspiredSolutions')
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
