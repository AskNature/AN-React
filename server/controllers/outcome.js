/**
* Outcome Controller - receives actions via the router
* and interacts with the database
*/

'use strict';
var db = require('../config/database').db;
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
   console.log('The product page has access to the ' + db.name + ' database.');
};

/** Return a list of functions, along with the names of each function's children and parent.*/

var returnList = function(req, res) {
  db
  .select('name, description, in("ChildOf").name as children, out("ChildOf").name as parent')
  .from('Function')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
      console.log('The product controller has sent ' + results.length + ' records.');
      // console.log(results);
      console.log("User: " + JSON.stringify(req.user));
  })
  .done();
}

    module.exports = {
      loadindex: loadindex,
      returnList: returnList
    };
