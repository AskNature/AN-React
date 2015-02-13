/**
* User Controller - receives actions via the router
* and interacts with the session store
*/

'use strict';

var settings = require('../config/env/default'),
path = require('path');

var returnUser = function(req, res, next) {
    if(req.user) {
	res.status(200).json({
	    username: req.user.username,
	    email: req.user.email,
	    firstName: req.user.firstName,
	    lastName: req.user.lastName
	});
    } else {
	res.status(500).send("You're not logged in!");
    }
};

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
    returnUser: returnUser
};
