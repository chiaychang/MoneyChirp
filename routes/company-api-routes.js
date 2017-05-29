var db = require("../models");
//we may not need passport for the following-api-routes
// var passport = require("../config/passport");

module.exports = function(app) {

	// get or post/// or put
	app.post("/api/:company_name", function(req, res) {
		//test for input data
		console.log("=========================================");
		console.log(" ");
		console.log("this is from the following-api... " + req.params.company_name);
		console.log(" ");
		console.log("=========================================");

		var company_name = req.params.company_name;

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
					// res.redirect(307, '/api/login');
					res.render("/members");
				}).catch(function(err) {
					console.log("following create err : " + err);
				});
		});
			res.redirect("/");
	});

	//delete company from user list
	app.put("/company_delete/:id", function(req, res) {

		var companyId = req.params.id;

		db.Following.destroy({
			where: {
				companyListId: companyId,
				UserId: req.user.idß
			}
		}).then(function() {
			console.log("data was deleted!!!!");
			res.redirect("/");
		});

	})

};










