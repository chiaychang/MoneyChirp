var path = require("path");

module.exports = function(app) {
	app.get("/", function(require, response) {
		res.sendFile(path.join(__dirname + "/../public/index.handlebars"));
	});
};