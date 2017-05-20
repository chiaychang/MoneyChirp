var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	
	app.get("/", function(req, res) {
		var hbsObject = {};
		
		res.render("signup", hbsObject);
		// res.sendFile(path.join(__dirname + "/../public/signup"));
	});

	app.get("/login", function(req, res) {
		var hbsObject = {};
		
		res.render("login", hbsObject)
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