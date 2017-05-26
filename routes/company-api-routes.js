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

	app.get("/api/search", function(req, res) {

		// console.log("from company api " + req.body.company_name)

		// db.company_list.create({
		// 	company_name: req.body.company_name,
		// }).then(function(dbCompany) {
		// 	req.json(dbCompany);
		// }).catch(function(err) {
		// 	res.json(err);
		// });

		var companyName = req.body.company_name;
		console.log("===========================");
		console.log("");
		console.log("pre db log " + companyName);
		console.log("");
		console.log("===========================");

		// find company
		db.company_list.findAll({
			where: {
				company_name: req.body.company_name
			}
		}).then(function(dbCompany) {
			console.log("this is the result from find all " + dbCompany);
		});
	});

};