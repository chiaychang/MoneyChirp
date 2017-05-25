var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	
	app.get("/", function(req, res) {

		if (req.user) {
			res.redirect("/members");
			return false;
		}
		res.render("signup");
	});

	//NOT IN USE RIGHT NOW
	// app.get("/login", function(req, res) {
	// 	var hbsObject = {};
			
	// 	if (req.user) {
	// 		res.render("members", hbsObject);
	// 	}

	// 	res.render("login", hbsObject)
	// });


	app.get("/members", isAuthenticated, function(req, res) {

		var hbsObject = {};
		res.render("members", hbsObject);
	});
};