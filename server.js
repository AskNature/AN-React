/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');

// Create Express server.
var app = express();

// Database configuration
var dataconfig = require('./server/config/database')(app);

// Express configuration
require('./server/config/express')(app, express);

// Add coloring for console output
require('colors');

// Start Express server.
app.listen(app.get('port'), function() {
    console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;
