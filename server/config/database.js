/**
* Database Configuration
*/

'use strict';
var config = require('./secrets.json');
var oriento = require('oriento');

// Add coloring for console output
require('colors');

var databaseConfig = function() {

  // Connect to orient server
  var server = oriento(config.server);

  // Use the 'AskNature' database
  var db = server.use(config.database);

  module.exports.db = db;

  db.class.list()
  .then(function (classes){
    console.log('✔ Connected to the '.green + this.name.green + ' database'.green + ' as '.green + this.username.blue + '.'.green + ' There are ' + classes.length + ' classes in this database.');
  }).catch(function(err){
    console.log('✗ Problem connecting to '.red + this.name.blue + ' database.'.red);
  });

  return {
    db: db,
    server: server
  };

};

module.exports.config = databaseConfig;
