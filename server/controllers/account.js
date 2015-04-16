/**
 * Account Controller - receives actions via the router
 * and interacts with the session store
 */

'use strict';

var settings = require('../config/env/default'),
    db = require('../config/database').db,
    path = require('path'),
    crypto = require('crypto'),
    sendgrid = require('../config/sendgrid').client,
    Account = require('../models/account.js');

var login = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), {
        root: settings.root
    });
};

var signup = function(req, res) {
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), {
        root: settings.root
    });
};

var editSettings = function(req, res) {
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), {
        root: settings.root
    });
};

var forgot = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    // Render index.html to allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), {
        root: settings.root
    });
};

var reset = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    // Render index.htmlto allow application to handle routing
    res.sendFile(path.join(settings.staticAssets, '/index.html'), {
        root: settings.root
    });
};

var verify = function(req, res) {
    db.select().from('PassportUser').where({
        verified: false,
        verifyToken: req.params.token
    }).limit(1).one().then(function(user) {
        if (user) {
            db.update('PassportUser').set({
                verified: true,
                verifyToken: ''
            }).where({
                masterid: user.id
            }).scalar().then(function(total) {
                if (!req.isAuthenticated()) {
                    req.login(user, function(err) {
                        if (!err) {
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


var logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

var forgotAccount = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.status(403).send('You\'re already logged in to an account');
    } // user already logged in
    db.select().from('PassportUser').where({
        email: req.body.email
    }).limit(1).one().then(function(user) {
        if (user) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                console.log(JSON.stringify(user));
                db.update('PassportUser').set({
                        passwordReset: true,
                        passwordToken: token
                    })
                    .where({
                        masterid: user.id
                    }).scalar().then(function(total) {
                        console.log("generated reset token for " + total + " user.");
                        console.log("User: " + user.email + ", Token: " + token);
                        var email = {
                            from: "support@asknatu.re",
                            to: user.email,
                            subject: "AskNatu.re Password Reset",
                            text: "http://asknatu.re/reset/" + token,
                            html: "<a href=\"http://asknatu.re/reset/" + token + "\">Reset password</a>"
                        };
                        sendgrid.sendMail(email, function(err, info) {
                            if (err) {
                                console.log("sendgrid error: " + err);
                                res.status(500).send("Sendgrid error");
                            } else {
                                console.log("Reset message sent");
                                res.status(200).send();
                            }
                        });
                    });
            });
        } else {
            // user doesn't exist in the database
            res.status(403).send("User with that address doesn't exist");
        }
    });
};

var resetAccount = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.status(403).send("You're already logged in to an account");
    }
    console.log(req.body.token);
    db.select().from('PassportUser').where({
        passwordReset: true,
        passwordToken: req.body.token
    }).limit(1).one().then(function(user) {
        if (user) {
            db.update('PassportUser').set({
                passwordReset: false,
                passwordToken: '',
                password: req.body.password
            }).where({
                masterid: user.id
            }).scalar().then(function(total) {
                console.log("reset password");
                res.status(200).send();
            });
        } else {
            res.status(403).send("User with that reset token doesn't exist");
        }
    });
};

var returnAccount = function(req, res, next) {
    if (req.user) {
	console.log(req.user);
        Account.getWithRelationships(req.user.id, function(u) {
            res.status(200).json({
                username: req.user.username,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                password: req.user.password,
                role: req.user.role,
                loggedIn: true,
                status: u.status
            });
        });
    } else {
        res.status(200).json({
            loggedIn: false
        });
    }
};

var updateAccount = function(req, res, next) {
    if (req.user) {
        db.update('PassportUser').set(req.body)
            .where({
                masterid: req.user.id
            }).scalar().then(function() {
                console.log("user updated");
            });
        res.status(200).send(req.body);
    } else {
        res.status(403).send("You're not logged in!");
    }
};

var createAccount = function(req, res, next) {
    var name = req.body.email.split("@")[0];

    var conflict = false;

    db.select('count(*)').from('PassportUser').where({
        email: req.body.email
    }).scalar().then(function(count) {
        console.log(JSON.stringify(count));
        if (count > 0) {
            return res.status(400).send("email taken");
        } else {
            var token = '';
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                db.insert().into('PassportUser')
                    .set({
                        masterid: req.body.email,
                        username: name,
                        firstName: '',
                        lastName: '',
                        email: req.body.email,
                        provider: "Local",
                        role: "user",
                        password: req.body.password,
                        verified: false,
                        verifyToken: token
                    }).one().then(function(user) {
                        console.log("user created");
                        var email = {
                            from: "support@asknatu.re",
                            to: user.email,
                            subject: "AskNatu.re Email Verification",
                            text: "http://asknatu.re/verify/" + token,
                            html: "<a href=\"http://asknatu.re/verify/" + token + "\">Verify account</a>"
                        };

                        sendgrid.sendMail(email, function(sgerr, info) {
                            if (sgerr) {
                                return res.status(500).send("Sendgrid error");
                            }
                            req.login(user, function(err) {
                                if (err) {
                                    return res.status(500).send("failure");
                                }
                                return res.status(201).send("success");
                            });
                        });

                    });
            });
        }
    });
};

module.exports = {
    login: login,
    signup: signup,
    editSettings: editSettings,
    forgot: forgot,
    reset: reset,
    verify: verify,
    returnAccount: returnAccount,
    updateAccount: updateAccount,
    createAccount: createAccount,
    logout: logout,
    forgotAccount: forgotAccount,
    resetAccount: resetAccount,
};
