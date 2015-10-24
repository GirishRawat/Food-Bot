var restclient = require('node-restclient');
var Twit = require('twit');


// insert your twitter app info here
var T = new Twit({
  consumer_key:         'il0mJDBMHUlm9wJMAVArqicR9', 
  consumer_secret:      'SviIkkLKQyfOfAHYEnYWGQrZT7AfgpDrB0S4dJMC5SEQZuqyKA',
  access_token:         '4005540733-hpQdqwtR0DpShALN7M23JfocqVcenRjUrnIvG61',
  access_token_secret:  'fH7wn6xkwiTaiTqNMK49Z1h0jwIuguPm7dgVk7gyxExo3'
});

function makeMetaphor() {

  var random = ["Burgers" , "Green Salad", "Big Mac", "Banana", "Apple", "Orange", "Cashew", "Girish"];
  var rand = random[Math.floor(Math.random() * random.length)];
  var fullTweet = rand + " #FoodBot";
  
  T.post('statuses/update', { status: fullTweet }, function(err, data, response) {
  console.log(data);
})  
}


function favRTs () {
  T.get('statuses/retweets_of_me', {}, function (e,r) {
    for(var i=0;i<r.length;i++) {
      T.post('favorites/create/'+r[i].id_str,{},function(){});
    }
    console.log('harvested some RTs'); 
  });
}

// every 1 minutes, make and tweet a metaphor
// wrapped in a try/catch in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.
setInterval(function() {
  try {
    makeMetaphor();
    console.log("Tweeting now!");
  }
 catch (e) {
    console.log(e);
  }
},60000);

// every 1 hours, check for people who have RTed a metaphor, and favorite that metaphor
setInterval(function() {
  try {
    favRTs();
    console.log("Tryingto favourite the tweet!");
  }
 catch (e) {
    console.log(e);
  }
},60000);
