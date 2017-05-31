var db = require("../models");
var Client = require('node-rest-client').Client;
var client = new Client();


module.exports = function(app) {

	app.post("/barchart_stock/:stock", function(req, res) {

		// var companyStock = req.params;
		var companyStock = req.params;

		console.log(companyStock.stock);

		// take a look at moment.js to lock set a week prior
		client.get("http://marketdata.websol.barchart.com/getHistory.json?key=5f1d20803f9a33507c2f332d07223231&symbol=" + companyStock.stock  +"&type=daily&startDate=20140525000000", function(data, response) {

			console.log("///////////////////////////////");
			console.log("");
			for (var i = 0; i < data.results.length; i++) {
				/// joy to here
				console.log(data.results[i].tradingDay);
			}
			console.log("");
			console.log("///////////////////////////////");
		});

	});

};