var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

<<<<<<< HEAD
//
=======

>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
passport.use(new LocalStrategy(
{
	usernameField: "email"
}, function(email, password, done) {

	db.User.findOne({
		where: {
			email: email
		}
	}).then(function(dbUser) {
		if (!dbUser) {
			return done(null, false, {
				message: "no user found."
			});
		}
		else if (!dbUser.validPassword(password)) {
			return done(null, false, {
				message: "Incorrect password."
			});
		}
		return done(null, dbUser);
	});
}));


passport.serializeUser(function(user, cb) {
<<<<<<< HEAD
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

module.exports = passport;
=======
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
