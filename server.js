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


//Set up for Express server/app
var app = express();
// var PORT = process.env.PORT || 3000;
app.set("port", (process.env.PORT || 3000));

// Requireing to sync our sequelize models to the database
var db = require("./models");

//set up for the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main", }));
app.set("view engine", "handlebars");
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use("/static", express.static(path.join(__dirname, "public")));
//set up for static directory
// app.use(express.static(process.cwd() + "./public"));


//set up for passport test
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// set up to sync the sequelize models and start the express server/app

db.sequelize.sync({ force: true }).then(function() {
	app.listen(app.get("port"), function() {
		console.log("Chirp! you are on PORT : " + app.get("port"));
	});
});
