require("dotenv").config();

//add code required to import keys.js file and store it in a variable
var keys = require("./keys.js");

//require apis
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

//access key information
//Spotify
var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});
// Twitter
var client = new Twitter({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token_key: keys.twitter.access_token_key,
	access_token_secret: keys.twitter.access_token_secret
});

client.post("statuses/update", {status: "I am not a bot"}, function(error, tweet, response) {
	if(error) throw "Unable to post information";
	console.log(tweet);
	console.log(response);
});

// spotify.search({type: "track", query: "All the Small Things"}, function(err, data) {
// 	if (err) {
// 		return console.log("Error occured: " + err);
// 	}
// 	console.log(data);
// })

//commands that liri will understand 

//my-tweets will show the last 20 tweets and when they were created

//spotify-this-song "name of song" will show artist, song name, preview link to the song on Spotify, album

//default song is "The Sign" by Ace of Base

//movie-this "movie name " will show title of movie, year, IMDB rating, Rotten Tomatoes rating, country where produced, language of movie, plot, actors

//default movie is "Mr. Nobody"

