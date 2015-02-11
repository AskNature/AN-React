var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./secrets.json');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
	console.log("User: ");
	console.log(user);
	done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
	// fetch the user from orient here
	done(null, {id: id, name: "Scott Halstvedt"});
    });

    passport.use(new GoogleStrategy({
	clientID: config.passport.clientID,
	clientSecret: config.passport.clientSecret,
	callbackURL: config.passport.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
	// find or create user in orient
	// update user with refresh token
	// return done(err, user)
	console.log("Hit!");
	return done(null, {id: 1, name: "Scott Halstvedt"});
    }
));
}
