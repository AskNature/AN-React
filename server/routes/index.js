/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var path = require('path');
var fs = require('fs');
var passport = require('passport');

var routes = function (app, passport) {

    // Dynamically load all routes
    fs.readdirSync(__dirname).forEach(function(file) {
        // Dont load this index.js file
        if (!/index/.test(file)) {
            var route = path.join(__dirname, file);
            require(route)(app, passport);
        }
    });

    // Home
    app.get('/', indexController.index);
    /*app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/' + req.user.username);
    });*/
};

module.exports = routes;
