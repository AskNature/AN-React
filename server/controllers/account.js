/**
* User Controller - receives actions via the router
* and interacts with the session store
*/

'use strict';

var settings = require('../config/env/default'),
path = require('path');

var login = function(req, res) {
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var signup = function(req, res) {
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var editSettings = function(req, res) {
  // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

module.exports = {
    login: login,
    signup: signup,
    editSettings: editSettings
};
