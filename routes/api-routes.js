var db = require("../models");

module.exports = function(app) {
	app.post("/api/signup", function(req, res) {
		console.log(req.body);

		db.mc_user.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			res.redirect(307, "/api/login");
		}).catch(function(err) {
			res.json(err);
		});
	});
};