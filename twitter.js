// for testing, this part should be deleted once Sequelize is connected 
// Require mysql
// var fs = require("fs");
// var mysql = require("mysql");


// // Set up our connection information
// var connection;
// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({
//         port: 3306,
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "MoneyChirp_db"
//     });
// }
// // Connect to the database
// connection.connect(function(err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }
//     console.log("connected as id " + connection.threadId);
// });

// --------------------------------------------------

// var fs = require("fs");
// var twitter = require("./twitter.js");

// twitter.twitter.getParams();


var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;
var Twitter = require('twitter');

var client = new Twitter(accountInfo);
// module.exports = twitter;
var companiesArray = [];
var companiesScore = [];

$(document).ready(function() {

    var companyIndex = 1;
    //add company function
    $("#addBtn").click(function() {
        event.preventDefault();
        var companyPicked = $("#addInput").val();

        console.log(companyPicked);


        //*** need to figure out how to empty input after selected one company 
        // $("#addInput").removeAttr('value');

        var displayBtn = $("<button>").addClass("mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent");
        displayBtn.text(companyPicked);
        displayBtn.addClass(companyIndex);
        $("#following").append(displayBtn);
        $("#following").append("  ");

        companiesArray.push(companyPicked);
        //*** delete buttons go with companies followed ---- spacing CSS issues --- will work on this later

        // var deleteBtn = $("<button>").addClass(companyIndex);
        // deleteBtn.addClass("deleteBtn mdl-button mdl-js-button mdl-button--raised").text("delete");

        // $("#deleteBtns").append(deleteBtn);
        // $("#deleteBtns").append("  ");

        companyIndex++;

    });

    $("#runBtn").click(function() {
        twitter.getParams();
        runChart();

    });
});

// var handleArray = [];


var twitter = {

    scoreArray: [],
    getParams: function() {


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
            companiesArray.forEach(twitter.getTweets);
            setTimeout(function() {
                console.log(companiesScore);
            }, 2000);

        // });

        // return twitter.scoreArray;
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
                companiesScore.push(trendingScore);

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




function runChart() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: companiesArray,
            datasets: [{
                label: ["Twitter Trending Score"],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: companiesScore
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    });
}