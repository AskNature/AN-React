/**
* User Controller - receives actions via the router
* and interacts with the session store
*/

'use strict';

var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');

var logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

var returnUser = function(req, res, next) {
    if(req.user) {
	res.status(200).json({
	    username: req.user.username,
	    email: req.user.email,
	    firstName: req.user.firstName,
	    lastName: req.user.lastName,
	    password: req.user.password,
	    role: req.user.role,
	    loggedIn: true
	});
    } else {
	res.status(200).json({loggedIn: false});
    }
};

var updateUser = function(req, res, next) {
    if(req.user) {
	db.update('PassportUser').set(req.body)
	    .where({id:req.user.id}).scalar().then(function() {
		console.log("user updated");
            });
	res.status(200).send(req.body);
    } else {
	res.status(500).send("You're not logged in!");
    }
};

var createUser = function(req, res, next) {
    var name = req.body.email.split("@")[0];

    var conflict = false;

    db.select('count(*)').from('PassportUser').where({email: req.body.email}).scalar().then(function(count) {
	console.log(JSON.stringify(count));
	if(count > 0) {
	    return res.status(400).send("email taken");
	} else {
	    db.insert().into('PassportUser')
		.set({
		    id: req.body.email,
		    username: name,
		    firstName: '',
		    lastName: '',
		    email: req.body.email,
		    provider: "Local",
		    role: "user",
		    password: req.body.password
		}).one().then(function(user) {
		    console.log("user created");
		    req.login(user, function(err) {
			if(err) { return res.status(400).send("failure"); }
			return res.status(201).send("success");
		    });
		});	    
	}
    });
};

module.exports = {
    returnUser: returnUser,
    updateUser: updateUser,
    createUser: createUser,
    logout: logout
};
