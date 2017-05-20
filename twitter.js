var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;

var Twitter = require('twitter');

var client = new Twitter(accountInfo);
var params = { q: '%40NASA', count: 80 };

function getTweets(){

client.get('search/tweets', params, function(error, response) {
    if (error) {
        console.log('Error occurred: ' + error);
    } else if (!error) {
         // console.log(response);
         console.log(response.statuses.length);
         // console.log(response);

        // for (var i = 0; i < tweets.length; i++) {
        //     console.log("#" + (1 + i) + ": " + tweets[i].text);
        // }

    }
});
}

getTweets();
