var path = require("path");
<<<<<<< HEAD
var db = require("../models");
=======
>>>>>>> twitterquery
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	
	app.get("/", function(req, res) {
<<<<<<< HEAD

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
=======
		var hbsObject = {};
		
		res.render("signup", hbsObject);
		// res.sendFile(path.join(__dirname + "/../public/signup"));

	});

	app.get("/login", function(req, res) {
		var hbsObject = {};
		
		res.render("login", hbsObject)
	});

	app.get("/select", function(req, res) {
		var hbsObject = {};
		console.log("isAuthenticated");
		res.render("select", hbsObject);
	});


	app.get("/members", isAuthenticated, function(req, res) {
		var hbsObject = {};
		console.log(isAuthenticated);
		res.render("members", hbsObject);
	});

	// app.get("/members", isAuthenticated, function(req, res) {
	// 	mc_user.all(function(data) {
	// 		var hbsObject = { mc_user: data };
	// 		console.log(hbsObject);
	// 		res.render("members", hbsObject);
	// 	});
	// });
>>>>>>> twitterquery
};