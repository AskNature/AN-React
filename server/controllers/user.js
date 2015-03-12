'use strict';
var db = require('../config/database').db,
settings = require('../config/env/default'),
path = require('path');
var _ = require('lodash');

var Cached = require('cached');
var userCache;

if(process.env.NODE_ENV === 'production') {
    userCache = new Cached('user', { backend: {
	type: 'memcached',
	hosts: '127.0.0.1:11211'
    }});
} else {
    userCache = new Cached('user');
}
userCache.setDefaults({'freshFor': 120});


var logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

var forgotUser = function(req, res, next) {
    if (req.isAuthenticated()) { res.status(403).send('You\'re already logged in to an account'); } // user already logged in
    db.select().from('PassportUser').where({email: req.body.email}).limit(1).one().then(function(user) {
	if(user) {
	    crypto.randomBytes(20, function(err, buf) {
		var token = buf.toString('hex');
		console.log(JSON.stringify(user));
		db.update('PassportUser').set({passwordReset: true, passwordToken: token})
		    .where({id: user.id}).scalar().then(function(total) {
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
			    if(err) {
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

var resetUser = function(req, res, next) {
    if(req.isAuthenticated()) { res.status(403).send("You're already logged in to an account"); }
    console.log(req.body.token);
    db.select().from('PassportUser').where({passwordReset: true, passwordToken: req.body.token}).limit(1).one().then(function(user) {
	if(user) {
	    db.update('PassportUser').set({passwordReset: false, passwordToken: '', password: req.body.password}).where({id: user.id}).scalar().then(function(total) {
		console.log("reset password");
		res.status(200).send();
	    });
	} else {
	    res.status(403).send("User with that reset token doesn't exist");
	}
    });
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
	res.status(403).send("You're not logged in!");
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
	    var token = '';
	    crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
		db.insert().into('PassportUser')
		    .set({
			id: req.body.email,
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
			    if(sgerr) { return res.status(500).send("Sendgrid error"); }
                            req.login(user, function(err) {
				if(err) { return res.status(500).send("failure"); }
				return res.status(201).send("success");
                            });
			});

		    });
	    });
	}
    });
};

var loadindex = function(req, res, next) {
  // Render index.html to allow application to handle routing
   res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
   console.log('The product page has access to the ' + db.name + ' database.');
};

var returnList = function(req, res) {
  var chain = db
  .select('name, first, last, masterid, registration_date, "user" as entityType')
  .from('Users')
  .where('out_Flagged IS NULL AND email_confirmed == 1');

  var limit = parseInt(req.query.limit);
  if(limit) {
      chain.limit(limit);
  }

  var offset = parseInt(req.query.offset);
  if(offset) {
      chain.offset(offset);
  }

  var order = req.query.order;
  if(order) {
      chain.order(order.substring(1) + (order.substring(0,1)==='-' ? ' desc' : ' asc'));
  }

  var filter = req.query.filter;
  if(filter) {
      chain.containsText({'name' : filter});
  }

  userCache.getOrElse('count', Cached.deferred(function(done) {
      console.log("cache miss");
      db.select('count(*)').from('Users')
      .where('out_Flagged IS NULL AND email_confirmed == 1')
      .scalar().then(function(count) {
	  done(null, count); // return Cached.deferred
      }).done();
  })).then(function(count) {
      chain.all().then(function(results) {
	  res.status(200).json({
	      results: results,
	      count: count,
	      maxPages: Math.ceil(count/limit)
	  });
	  console.log('The user collection controller has send '+ results.length + ' records.');
      }).done();
  });
};

var returnItem = function(req, res, next) {
  console.log(req.params.id);
  db
  .select('masterid, name, first, last, email, roles, registration_date, timestamp, out("Flagged").name as flagged, email_confirmed, special_text, activities, address_1, address_2, city, state, postal_code, country, time_zone, phone, extension, tollfree, fax, im, langs_spoken, revision, hide_email, send_email, alert_frequency, last_alerted, status, contact_me, hide_address, hide_phone, gender, custom_avatar, ip_address, out("HasMedia").filename as media, out("HasMedia").name as media_name, out("HasMedia").entity as media_entity, out("HasMedia").masterid as media_id, out("AddedMedia").filename as added_media, out("Bookmarked").name as collected, out("Friends").name as friends, password, salt, persist, newpassword, email_salt')
  .from('Users')
  .where('masterid == "' + req.params.id + '"')
  .all()
  .then(function (results) {
      res.status(200).json({
        results: results
      });
  })
  .done();
};

module.exports = {
    returnUser: returnUser,
    updateUser: updateUser,
    createUser: createUser,
    logout: logout,
    forgotUser: forgotUser,
    resetUser: resetUser,
    loadindex: loadindex,
    returnList: returnList,
    returnItem: returnItem
};
