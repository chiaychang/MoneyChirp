var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

<<<<<<< HEAD

=======
//
>>>>>>> twitterquery
passport.use(new LocalStrategy(
{
	usernameField: "email"
}, function(email, password, done) {

<<<<<<< HEAD
	db.User.findOne({
=======
	db.mc_user.findOne({
>>>>>>> twitterquery
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
>>>>>>> twitterquery
