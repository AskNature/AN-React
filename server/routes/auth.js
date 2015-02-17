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

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));

  app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: [ 'r_basicprofile', 'r_emailaddress' ] }));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login', successRedirect: '/' }));

  app.post('/auth/db', passport.authenticate('local'), function(req, res) { res.send(); });
};

module.exports = routes;
