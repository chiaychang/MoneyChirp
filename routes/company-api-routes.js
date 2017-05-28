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

	// get or post/// or put
	app.post("/api/:company_name", function(req, res) {
		//test for input data
		console.log("=========================================");
		console.log(" ");
		console.log("this is from the following-api... " + req.params.company_name);
		console.log(" ");
		console.log("=========================================");

		var company_name = req.params.company_name;

		// if (searchParam) {
		// 	db.company_list.findAll({
		// 		where: {
		// 			company_name: searchParam
		// 		}
		// 	}).then(function(results) {
		// 		console.log("=========================================");
		// 		console.log(results.datatypes.id);
		// 		console.log("=========================================");
		// 	});
		// }

		db.sequelize.query(
			'SELECT company_lists.ID ' +
			'FROM company_lists ' +
			'WHERE company_name = :company_name ' +
			'LIMIT 1',
			{

				replacements: {company_name}, type: db.sequelize.QueryTypes.SELECT

			}).then(function(data) {
				var companyIdNum = [];
				data.forEach(function(dataRes) {	
					companyIdNum.push(dataRes.ID);
				});
				//console log for testing to ensure that i am capturing the correct data
				console.log("------------------------");
				console.log("");
				console.log(data[0]);
				console.log("User ID num : " + req.user.id);
				console.log("");
				console.log(companyIdNum);
				console.log(companyIdNum[0]);
				console.log("------------------------");

				db.Following.create({
					companyListId: companyIdNum[0],
					UserId: req.user.id
				}).then(function(){
					res.redirect(307, '/api/login');
				}).catch(function(err) {
					console.log("following create err : " + err);
				});

		});

	});

});
};