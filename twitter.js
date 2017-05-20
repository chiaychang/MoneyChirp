var keys = require("./keys.js");
var accountInfo = keys.twitterKeys;

var Twitter = require('twitter');

var client = new Twitter(accountInfo);

var companies = [{
    name: 'Apple',
    handle: 'Apple',
    score: 0
}, {
    name: 'Google',
    hadle: 'Google',
    score: 0
}, {
    name: 'Facebook',
    handle: 'facebook',
    score: 0

}];

var scoreArray = [];

// function trend(totalPostReach) {
//     companies[i].reach = totalPostReach;
//     console.log(companies[i].reach);
// }

function getTweets() {
 
    for (var i = 0; i < companies.length; i++) {


        var score = 0;
        var params = { q: '%40' + companies[i].name, count: 3, lang: 'en'};

        client.get('search/tweets', params,function(error, response) {
            if (error) {
                console.log('Error occurred: ' + error);
            } else if (!error) {


              
               // console.log(response.statuses.length);

                
                for (j = 0; j < response.statuses.length; j++) {

                	// console.log(response.statuses[j].retweet_count, response.statuses[j].favorite_count);
                    var postReach = (response.statuses[j].retweet_count +
                        response.statuses[j].favorite_count);

                    score += postReach;
          
                }

               // scoreArray.push(score);
               // console.log(scoreArray);
           
            

               //companies[params.index].reach = totalPostReach;
     
            }
           
        });

    
       // totalPostReach = companies[i].reach;
         // console.log(i);
    }


}

function assignScore (companies,scoreArray){
	
	console.log(companies);
	
	for(var k = 0; k< companies.length; k++){
	    console.log(scoreArray[k]); 
		// console.log(companies[k]);
	}

}


getTweets();
// console.log(companies.length);
assignScore(companies, scoreArray);

