var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
	app.get("/", function(req, res) {

		var hbsObject = {};

		if (req.user){
			res.redirect("/members");
		}

		res.render("signup", hbsObject);
		// res.sendFile(path.join(__dirname + "/../public/signup"));
	});
};