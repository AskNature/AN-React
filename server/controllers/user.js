/**
* User Controller - receives actions via the router
* and interacts with the session store
*/

'use strict';

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

var updateUser = function(req, res, next) {
    if(req.user) {
	res.status(200).send();
	
    } else {
	res.status(500).send("You're not logged in!");
    }
};

module.exports = {
    returnUser: returnUser
};
