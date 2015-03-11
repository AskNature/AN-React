/**
* Demo Controller
*/

'use strict';

var settings = require('../config/env/default'),
path = require('path');

var infinite = function(req, res) {
    if(req.isAuthenticated()) { res.redirect('/') }
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var relationships = function(req, res) {
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

module.exports = {
    infinite: infinite,
    relationships: relationships
};
