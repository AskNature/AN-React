'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var returnList = function(req, res) {
  db
  .select('name, masterid')
  .from('LivingSystem')
  .where('in_HasLivingSystem IS NOT NULL')
  .limit('200')
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
