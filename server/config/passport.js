var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var config = require('./secrets.json');

var externalLoginFunc = function(database) { return function(accessToken, refreshToken, profile, done) {
    // find or create user in orient
    database.select().from('PassportUser').where({masterid: profile.id}).limit(1).one().then(function(user) {
        if(user) {
            return done(null, user);
        } else {
            // create new profile in database
            database.insert().into('PassportUser')
                .set({
                    masterid: profile.id,
                    username: profile.emails[0].value.split("@")[0],
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    provider: profile.provider,
		    role: 'user',
                    password: '',
		    verified: true
                }).one().then(function(user) {
                    return done(null, user);
                });
        }
    });
}};

module.exports = function(passport, database) {
    passport.serializeUser(function(user, done) {
	done(null, user.masterid);
    });

    passport.deserializeUser(function(id, done) {
	// fetch the user from orient
	database.select().from('PassportUser').where({masterid: id}).limit(1).one().then(function(user) {
	    if(user) {
		return done(null, user);
	    } else {
		return done("User doesn't exist in database!", null);
	    }
	});
    });

    passport.use(new GoogleStrategy({
	clientID: config.passport_google.clientID,
	clientSecret: config.passport_google.clientSecret,
	callbackURL: config.passport_google.callbackURL
    }, externalLoginFunc(database)));

    passport.use(new FacebookStrategy({
	clientID: config.passport_facebook.clientID,
	clientSecret: config.passport_facebook.clientSecret,
	callbackURL: config.passport_facebook.callbackURL
    }, externalLoginFunc(database)));

    passport.use(new LinkedInStrategy({
	clientID: config.passport_linkedin.clientID,
	clientSecret: config.passport_linkedin.clientSecret,
	callbackURL: config.passport_linkedin.callbackURL,
	scope: [ 'r_basicprofile', 'r_emailaddress' ],
	state: true
    }, externalLoginFunc(database)));

    passport.use(new LocalStrategy(
	function(email, password, done) {
	    database.select().from('PassportUser').where({email: email}).limit(1).one().then(function(user) {
		if(!user) {
		    console.log("no user found in db");
		    return done(null, false);
		}
		if(user.password && user.password != '' && user.password == password) {
		    console.log("login successful");
		    return done(null, user);
		}
		console.log("password failed");
		return done(null, false);
	    });
        }
    ));
}
