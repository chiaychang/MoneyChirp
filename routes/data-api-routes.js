var db = require("../models");
// var getCompanies = require('./get-company.js');
// var addTwitterScores = require('./add-twitter-scores.js');

// getCompanies().then(function(companies) {
//     addTwitterScores(companies).then(function() {
//         res.render('template', companies);
//     });
// });
var twitterData = [];

module.exports = function(app) {
    //Current data- when requested, provides JSON
    app.get("/api/data", function(req, res) {
        return res.json();
    });


    // Create new data object
    app.post("/api/data", function(req, res) {
        var twitter = require("./twitter.js");
        twitter.getParams();
        twitter.getTweets();
        twitter.postData();
    });

}
