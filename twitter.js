var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;

var Twitter = require('twitter');

var client = new Twitter(accountInfo);

var scoreArray = [];
var twitter = {
    companies: [{
        name: 'Apple',
        handle: 'Apple',
        score: null
    }, {
        name: 'Google',
        hadle: 'Google',
        score: null
    }, {
        name: 'Facebook',
        handle: 'facebook',
        score: null
    }],

    companiesArray: [],


    getTweets: function() {

        for (var i = 0; i < this.companies.length; i++) {

           

            var params = { q: '%40' + this.companies[i].name, count: 3, lang: 'en', index: i };

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

                      console.log(trendingScore);
                      scoreArray.push(trendingScore);
                    // scoreArray.push(trendingScore);
                    console.log(scoreArray);

                }

            });

        }

    },
}

twitter.getTweets();

