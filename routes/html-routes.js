var path = require("path");
<<<<<<< HEAD
=======
var db = require("../models");
>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	
	app.get("/", function(req, res) {
<<<<<<< HEAD
		var hbsObject = {};
		if (req.user){
			//signup -->members
			res.redirect("/signup");
		}
		res.render("signup", hbsObject);
		// res.sendFile(path.join(__dirname + "/../public/signup"));
	});

	app.get("/members", isAuthenticated, function(req, res) {
		mc_user.all(function(data) {
			var hbsObject = { mc_user: data };
			console.log(hbsObject);
			res.render("members", hbsObject);
		});
=======

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
>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
	});
};