var db = require("../models");
//we may not need passport for the following-api-routes
// var passport = require("../config/passport");

module.exports = function(app) {

	// app.post("/api/search", function(req, res) {
	// 	console.log("this is from the following-api... " + req.body.company_name);

	// 	db.following.create({
	// 		company_name: req.body.company_name,
	// 		//test for userId
	// 	}).then(function(dbFollowing) {
	// 		res.json(dbFollowing);
	// 		//re move 307 to end script 
	// 		// res.redirect('/api/search');
	// 	}).catch(function(err) {
	// 		res.json(err);
	// 	});
	// });

	app.post("/api/search", function(req, res) {

		db.company.create({
			company_name: req.body.company_name,
		}).then(function(dbCompany) {
			req.json(dbCompany);
		}).catch(function(err) {
			res.json(err);
		});
	});

};