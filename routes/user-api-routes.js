var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
	
	app.post("/api/login", passport.authenticate("local"), function(req, res) {
		res.json("/members");
	});


	app.post("/api/signup", function(req, res) {
		console.log(req.body);

		db.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			res.redirect(307, '/api/login');
		}).catch(function(err) {
			console.log(err);
		});
	});

	//not in use at the moment
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/user_data", function(req, res) {
		if (!req.user) {
			res.json({});
		}
		else {
			// res.json({
			// 	email: req.user.email,
			// 	id: req.user.id
			// });
			console.log(req.user.email);
			console.log(req.user.id);
			
			// db.Following.findAll({
			// 	where: {
			// 		UserId: req.user.id
			// 	},
			// 	include: {
			// 		model: db.company_list
			// 	}
			// }).then(function(dbTest) {
			// 	console.log("/////////////////////");
			// 	console.log("");
			// 	console.log(dbTest);
			// 	console.log("");
			// 	console.log("/////////////////////");
			// });

			// db.User.findAll({
			// 	include: [{
			// 		model: db.company_list,
			// 		through: {
			// 			attributes: ['companyListId'],
			// 			where: {
			// 				UserId: req.user.id
			// 			}
			// 		}
			// 	}]
			// }).then(function(data) {
			// 	console.log("/////////////////////");
			// 	console.log(data);
			// 	console.log("/////////////////////");
			// })

			// db.User.findAll({
			// 	where: {
			// 		id: req.user.id
			// 	},
			// 	include: [{
			// 		model: db.company_list,
			// 		through: {
			// 			attributes: ['companyListId'],
			// 			where: {
			// 				UserId: req.user.id
			// 			}
			// 		}
			// 	}]
			// }).then(function(data) {
			// 	console.log("////////////////////////");
			// 	// console.log(data);
			// 	console.log(data);
			// 	console.log("////////////////////////");
			// })

			db.User.findAll({
				where: {
					id: req.user.id
				},
				include: [ db.company_list ],
				raw: true
			}).then(function(data) {
				console.log("////////////////////////");
				console.log(data);
				console.log("////////////////////////");
			})

		}
	});
};