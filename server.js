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
var path = require("path");
// require passport 
var passport = require("./config/passport");
//express session login, similar to firebase sessions
var session = require("express-session");
// Requireing to sync our sequelize models to the database
var db = require("./models");
//Set up for Express server/app
var app = express();
// var PORT = process.env.PORT || 3000;
app.set("port", (process.env.PORT || 3000));
//run get calls to BARCHART api
// var Client = require('node-rest-client').Client;

//set up for the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main", }));
app.set("view engine", "handlebars");
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//the js file for the web page is in "public" folder
app.use("/static", express.static(path.join(__dirname, "public")));
//to the Css path
app.use(express.static(path.join(__dirname, "/public")));
//set up for static directory
// app.use(express.static(process.cwd() + "./public"));

// set up for passport test
app.use(session({ secret: "Money Chirp", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/company-api-routes.js")(app);
require("./routes/data-api-routes.js")(app);
require("./routes/barchart-api-routes.js")(app);

// set up to sync the sequelize models and start the express server/app
// force: false to maintain all data. true for testing.
db.sequelize.sync({ force: false }).then(function() {
	app.listen(app.get("port"), function() {
		console.log("Chirp! you are on PORT : " + app.get("port"));
	});
});

