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
	app.get("/login", function(req, res) {
		var hbsObject = {};
			
		if (req.user) {
			res.render("members", hbsObject);
		}

		res.render("login", hbsObject)
	});

	//Sarah's route
	// app.get("/select", function(req, res) {
	// 	var hbsObject = {};
	// 	console.log("isAuthenticated");
	// 	res.render("select", hbsObject);
	// });


	app.get("/members", isAuthenticated, function(req, res) {

		db.User.findAll({
				where: {
					id: req.user.id
				},
				include: [ db.company_list ],
				raw: true, //into a readable json format
				nest: true	//in to a nested format to access the companies_list table
			}).then(function(data) {
				console.log("////////////////////////");
				console.log(data.length);
				console.log(data);
				console.log("////////////////////////");

				var hbsObject = {
					company_name: data
				};

				console.log("this is the call to the hbsObj " + hbsObject);

				res.render("members", hbsObject);

			})
	});

	// 	var hbsObject = {};
		
	// 	res.render("signup", hbsObject);
	// 	// res.sendFile(path.join(__dirname + "/../public/signup"));

	// });

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

};