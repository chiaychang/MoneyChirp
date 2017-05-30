var request = require('request');


// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
var fs = require("fs");
var mysql = require("mysql");


// Set up our connection information
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "MoneyChirp_db"
    });
}
// Connect to the database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


var Client = require('node-rest-client').Client;

var client = new Client();

var stockSymbolArray = [];

var barchart = {
    getParams: function() {

        connection.query("SELECT stock_sym FROM company_lists", function(err, res) {

            if (err) {
                throw err;
            }
            console.log('res', res);
            for (var z = 0; z < res.length; z++) {
                stockSymbolArray.push(res[z].stock_sym);
            }
            console.log('stock symbol array', stockSymbolArray);
        });
    },

    getCompanies: function() {

        // var apple = "AAPL";

        // var stockSymbolsArray = ["AAPL", "MSFT", "GOOGL"];
        var arrayLength = stockSymbolArray.length;
    
        // console.log(stockSymbolArray);

        for (var i = 0; i < arrayLength; i++) {

            // direct way 
            client.get("http://marketdata.websol.barchart.com/getHistory.json?key=5f1d20803f9a33507c2f332d07223231&symbol=" + stockSymbolArray[i]  +"&type=daily&startDate=20170525000000", function(data, response) {
                // parsed response body as js object 
                // console.log(data.results[0].close);
                // console.log(data.results[0].symbol);
                // raw response 
                // console.log(response);
            });
        }


    }
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    barchart.getParams();
    barchart.getCompanies();
  console.log("App listening on PORT " + PORT);
});