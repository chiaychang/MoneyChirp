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

	app.get("/login", function(req, res) {
		var hbsObject = {};
			
		if (req.user) {
			res.render("members", hbsObject);
		}

		res.render("login", hbsObject)
	});

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

				res.render("members", hbsObject);
			});

	});

	
};