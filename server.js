// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

//Set up for Express server/app
var app = express();
// var PORT = process.env.PORT || 3000;
app.set("port", (process.env.PORT || 3000));

// Requireing to sync our sequelize models to the database
var db = require("./models");

//set up for the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//methodOverride set up
app.use(methodOverride("_method"));

//set up for static directory
app.use(express.static(process.cwd() + "./public"));

// Routes

require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/author-api-routes.js")(app);

// set up to sync the sequelize models and start the express server/app

db.sequelize.sync({ force: true }).then(function()) {
	app.listen(app.get("port"), function() {
		console.log("Chirp! you are on PORT : " + PORT);
	});
});
