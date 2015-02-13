/**
* Auth Routes
* Define controllers to call when various routes are received via
* client actions.
*/

'use strict';

var passport = require('passport');

var routes = function (app) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }));
  app.post('/auth/db', passport.authenticate('local'), function(req, res) { res.send(); });
};

module.exports = routes;
