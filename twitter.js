var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;

var Twitter = require('twitter');

var client = new Twitter(accountInfo);

var companies = [{
    name: 'Apple',
    handle: 'Apple',
    reach: 0
}, {
    name: 'Google',
    hadle: 'Google',
    reach: 0
}, {
    name: 'Facebook',
    handle: 'facebook',
    reach: 0
}];



function getTweets() {

    for (var i = 0; i < companies.length; i++) {

        var params = { q: '%40' + companies[i].name, count: 3, lang: 'en' };

        client.get('search/tweets', params, function(error, response) {
            if (error) {
                console.log('Error occurred: ' + error);
            } else if (!error) {


                console.log(response);
                console.log(response.statuses.length);

                var totalPostReach = 0;

                for (j = 0; j < response.statuses.length; j++) {
                    var postReach = (response.statuses[j].retweet_count +
                        response.statuses[j].favorite_count);

                    console.log(postReach);
                    totalPostReach += postReach;


                }
                // console.log(companies[i].reach);
                // companies[i].reach = totalPostReach;
                // console.log(companies[i].reach);

                // console.log(response);
                // for (var i = 0; i < tweets.length; i++) {
                //     console.log("#" + (1 + i) + ": " + tweets[i].text);
                // }

            }
        });



    }
}

getTweets();
