var path = require("path");
var chartData = require("../chartData.js");

//twitter stuff --- move to another file after testing
var keys = require("../keys.js");
var accountInfo = keys.twitterKeys;
var Twitter = require('twitter');
var client = new Twitter(accountInfo);


//twitter stuff --- move to another file after testing

var finalScores = [];
var companiesArray = [];

var getParams = function() {

    //need query in this part to get handels using names
    // connection.query("Select * from companies", function(err, res) {
    //     var companyArray = [];

    //     if (err) {
    //         throw err;
    //     }
    //     console.log(res);
    //     for (var z = 0; z < res.length; z++) {
    //         companyArray.push(res[z].name);
    //         handleArray.push(res[z].handle);

    //     }
    // console.log(companyArray, handleArray);

    companiesArray.forEach(getTweets);

}

var getTweets = function(element, index, array) {
    
    finalScores = [];

    var params = { q: '%40' + element, count: 3, lang: 'en' };

    client.get('search/tweets', params, function(error, response) {
        if (error) {
            console.log('Error occurred: ' + error);
        } else if (!error) {

            var trendingScore = 0;
            console.log(response);

            for (j = 0; j < response.statuses.length; j++) {

                // console.log(response.statuses[j].retweet_count, response.statuses[j].favorite_count);
                var postReach = (response.statuses[j].retweet_count +
                    response.statuses[j].favorite_count);
                console.log(postReach);
                trendingScore += postReach;

            }

            console.log(element + ":" + trendingScore);
            finalScores.push(trendingScore);
        }
    });
}


module.exports = function(app) {

    app.get("/dashboard", function(req, res) {
        res.sendFile(path.join(__dirname, "../dashboard.html"));
    });

    app.get("/api/chartData", function(req, res) {
        res.json(chartData);
    });

    app.post("/api/chartData", function(req, res) {
        chartData = req.body;
        companiesArray = req.body.labels;

        getParams();

        setTimeout(function() {
            console.log(finalScores);
            chartData.data = finalScores;
            res.json(chartData);
        }, 4000);

    });

    app.post("/api/clear", function() {
        // Empty out the arrays of data
        chartData = [];

    });


}