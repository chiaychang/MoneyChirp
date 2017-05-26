// for testing, this part should be deleted once Sequelize is connected 
// Require mysql
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

// --------------------------------------------------

// var fs = require("fs");
// var twitter = require("./twitter.js");

// twitter.twitter.getParams();


var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;

var Twitter = require('twitter');

var client = new Twitter(accountInfo);

var handleArray = [];


var twitter = {

    scoreArray: [],
    getParams: function() {


        connection.query("Select * from companies", function(err, res) {
            var companyArray = [];

            if (err) {
                throw err;
            }
            console.log(res);
            for (var z = 0; z < res.length; z++) {
                companyArray.push(res[z].name);
                handleArray.push(res[z].handle);

            }
            // console.log(companyArray, handleArray);
            handleArray.forEach(twitter.getTweets);
            setTimeout(function() { 
                console.log(twitter.scoreArray);
              }, 2000);

        });

        return twitter.scoreArray;
    },

    getTweets: function(element, index, array) {


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
                twitter.scoreArray.push(trendingScore);

            }
        });


    }

    // postData: function(scoreArray) {

    //     var twitterData = {
    //         name: companyArray,
    //         score: scoreArray
    //     }

    //     // console.log(twitterData);
    // }
}

module.exports = twitter;
