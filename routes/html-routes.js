var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	
	app.get("/", function(req, res) {
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
	});
};