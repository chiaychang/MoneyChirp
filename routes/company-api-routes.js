var db = require("../models");

module.exports = function(app) {

	////////////////////////// ADD COMPANY //////////////////////////////////
	app.post("/api/", function(req, res) {
		//test for input data
		console.log("=========================================");
		console.log(" ");
		console.log("this is from the following-api... " + req.body.company_name);
		console.log(" ");
		console.log("=========================================");

		var company_name = req.body.company_name;

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
					// this redirect refreshes the page to update the data
					res.redirect("/");
				});
		});
	});
	/////////////////////////////////////////////////////////////////////////////



	////////////////////////// DELETE COMPANY //////////////////////////////////
	// app.put("/company_delete/:id", function(req, res) {

	// 	var companyId = req.params.id;

	// 	db.Following.destroy({
	// 		where: {
	// 			companyListId: companyId,
	// 			UserId: req.user.id
	// 		}
	// 	}).then(function() {
	// 		console.log("data was deleted!!!!");
	// 		// this redirect refreshes the page to update the data
	// 		res.redirect("/");
	// 	});

	// });
	/////////////////////////////////////////////////////////////////////////////

};










