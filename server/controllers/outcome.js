/**
* Outcome Controller - receives actions via the router
* and interacts with the database
*/

'use strict';

var Oriento = require('oriento'),

// I'm positive there's a cleaner and more efficient way to connect to the db:
config = require('../config/secrets.json'),
oriento = Oriento(config.server),
db = oriento.use(config.database),

settings = require('../config/env/default'),
path = require('path');

/**
* I'm still not sure if this var is necessary to include in this file.
*/

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('This page has access to the ' + db.name + ' database.');
   next();
};

/**
* Instruct db to return all records in the "Function" class. This query should be changed to gremlin syntax.
*/

var returnOutcomes = function(req, res) {
  db.select().from('Function').all()
  .then(function (results) {
      res.send({results: results});
      console.log('The outcome controller has sent ' + results.length + ' records.');
  })
  .done();
}

    module.exports = {
      loadindex: loadindex,
      returnOutcomes: returnOutcomes
    };
