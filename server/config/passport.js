var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./secrets.json');

module.exports = function(passport, database) {
    passport.serializeUser(function(user, done) {
	done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
	// fetch the user from orient
	database.select().from('PassportUser').where({id: id}).limit(1).one().then(function(user) {
	    if(user) {
		return done(null, user);
	    } else {
		return done("User doesn't exist in database!", null);
	    }
	});
    });

    passport.use(new GoogleStrategy({
	clientID: config.passport.clientID,
	clientSecret: config.passport.clientSecret,
	callbackURL: config.passport.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
	// find or create user in orient
	database.select().from('PassportUser').where({id: profile.id}).limit(1).one().then(function(user) {
            if(user) {
		return done(null, user);
            } else {
		// create new profile in database
		database.insert().into('PassportUser')
		    .set({
			id: profile.id,
			username: profile.emails[0].value.split("@")[0],
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value,
			provider: "Google"
		    }).one().then(function(user) {
			return done(null, user);
		    });
	    }
	});
    }
));
}
