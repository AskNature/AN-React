/**
* User Controller - receives actions via the router
* and interacts with the session store
*/

'use strict';

var settings = require('../config/env/default'),
db = require('../config/database').db,
path = require('path');

var login = function(req, res) {
    if(req.isAuthenticated()) { res.redirect('/') }
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

var forgot = function(req, res) {
    if(req.isAuthenticated()) { res.redirect('/') }
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var reset = function(req, res) {
    if(req.isAuthenticated()) { res.redirect('/') }
    // Render index.htmlto allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var verify = function(req, res) {
    db.select().from('PassportUser').where({verified: false, verifyToken: req.params.token}).limit(1).one().then(function(user) {
        if(user) {
            db.update('PassportUser').set({verified: true, verifyToken: ''}).where({id: user.id}).scalar().then(function(total) {
		if(!req.isAuthenticated()) {
		    req.login(user, function(err) {
			if(!err) {
			    res.redirect('/settings');
			} else {
			    res.redirect('/');
			}
		    });
		} else {
		    res.redirect('/settings');
		}
            });
        } else {
            res.redirect('/');
        }
    });
};

module.exports = {
    login: login,
    signup: signup,
    editSettings: editSettings,
    forgot: forgot,
    reset: reset,
    verify: verify
};
