var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
	
	app.post("/api/login", passport.authenticate("local"), function(req, res) {
		res.json("/members");
	})


	app.post("/api/signup", function(req, res) {
		console.log(req.body);

		db.mc_user.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			// res.redirect(307, "/api/login");
			res.redirect(307, '/members');
		}).catch(function(err) {
			res.json(err);
		});
	});
};